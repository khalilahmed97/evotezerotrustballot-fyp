const fs = require('fs');
const path = require('path');
const { Keypair, Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const anchor = require('@project-serum/anchor');

const { utf8 } = require('@project-serum/anchor/dist/cjs/utils/bytes');

const network = "http://127.0.0.1:8899";
const connection = new Connection(network, 'processed');

// Generate a new Keypair
const generateKeypair = () => {
  const keypair = Keypair.generate();
  return keypair;
};

// Load keypair from file
const loadKeypair = () => {
  const senderKeypairPath = path.resolve(__dirname, '../idl/owner.json');
  if (!fs.existsSync(senderKeypairPath)) {
    throw new Error(`Keypair file not found at path: ${senderKeypairPath}`);
  }
  const senderSecretKey = JSON.parse(fs.readFileSync(senderKeypairPath, 'utf-8'));
  return Keypair.fromSecretKey(new Uint8Array(senderSecretKey));
};

const airdrop = async (publicKey) => {
  try {
    // Request an airdrop of 0.3 SOL
    const txid = await connection.requestAirdrop(publicKey, 0.3 * LAMPORTS_PER_SOL);
    
    await connection.confirmTransaction(txid);
    
    console.log(`Airdropped 0.3 SOL to ${publicKey.toBase58()}, txid: ${txid}`);
  } catch (err) {
    console.error('Airdrop error:', err);
  }
};

const getProvider = (wallet) => {
  return new anchor.AnchorProvider(connection, wallet, { "preflightCommitment": "processed" });
};

const interactWithSolanaProgram = async (voterID, president_choice, vp_choice, sr_vp_choice, gen_sec_choice) => {
  // Generate a new keypair and airdrop SOL
  const newKeypair = generateKeypair();
  await airdrop(newKeypair.publicKey);

  const idlPath = path.resolve(__dirname, '../idl/evoting.json'); // Path to your IDL file
  const idl = JSON.parse(fs.readFileSync(idlPath, 'utf-8'));
  
  const senderWallet = new anchor.Wallet(newKeypair); // Use the new keypair
  const provider = getProvider(senderWallet);
  const programID = new PublicKey(idl.address);
  const program = new anchor.Program(idl, programID, provider);

  const ownerPubKey = new PublicKey("84RjJWmNthEddx5wyRLDy3HQk2mbQ244BzHYY5QLKXH8");

  // Find the PDA
  const [escrowPDA, bump] = await PublicKey.findProgramAddress(
    [utf8.encode('escrow'), senderWallet.publicKey.toBuffer(), ownerPubKey.toBuffer()],
    program.programId
  );

  try {
    const tx = await program.methods
      .createEscrow(voterID, president_choice, vp_choice, sr_vp_choice, gen_sec_choice)
      .accounts({
        escrow: escrowPDA,
        from: senderWallet.publicKey,
        to: ownerPubKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();

    console.log(`Transaction Signature: ${tx}`);
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);


    const accountAddresses = [
      senderWallet.publicKey,
      newKeypair.publicKey, 
    ];

    await fetchEscrowData(program, escrowPDA);
    // await fetchMultipleAccounts(program, accountAddresses)

  } catch (error) {
    console.error('Error interacting with program:', error);
  }
};

const fetchEscrowData = async (program, escrowPDA) => {
  try {
    const escrowAccount = await program.account.escrowAccount.fetch(escrowPDA);

    console.log('Escrow Account Data:');
    console.log(`Voter ID: ${escrowAccount.voterId}`);
    console.log(`President Choice: ${escrowAccount.presidentChoice}`);
    console.log(`VP Choice: ${escrowAccount.vpChoice}`);
    console.log(`Sr VP Choice: ${escrowAccount.srVpChoice}`);
    console.log(`Gen Sec Choice: ${escrowAccount.genSecChoice}`);
    
  } catch (error) {
    console.error('Error fetching escrow account data:', error);
  }
};

const fetchMultipleAccounts = async (program, accountAddresses) => {
  try {
    const accounts = await Promise.all(
      accountAddresses.map(async (address) => {
        try {
          const accountData = await program.account.escrowAccount.fetch(new PublicKey(address));
          return { address, data: accountData };
        } catch (error) {
          console.error(`Error fetching account ${address}:`, error);
          return { address, data: null };
        }
      })
    );

    accounts.forEach((account) => {
      if (account.data) {
        console.log(`Data for ${account.address}:`);
        console.log(`Voter ID: ${account.data.voterId}`);
        console.log(`President Choice: ${account.data.presidentChoice}`);
        console.log(`VP Choice: ${account.data.vpChoice}`);
        console.log(`Sr VP Choice: ${account.data.srVpChoice}`);
        console.log(`Gen Sec Choice: ${account.data.genSecChoice}`);
      } else {
        console.log(`No data found for ${account.address}`);
      }
    });
  } catch (error) {
    console.error('Error fetching multiple accounts:', error);
  }
};

// Export the function for external use
module.exports = { interactWithSolanaProgram };
