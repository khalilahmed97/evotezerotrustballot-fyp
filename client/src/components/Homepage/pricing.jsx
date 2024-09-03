import React from 'react';

const Pricing = () => {
  const tiers = [
    {
      title: 'BRONZE',
      price: '60',
      description: [
        '2000 VOTERS',
        'BASIC ANALYTICS',
        'EMAIL NOTIFICATIONS FOR VOTERS',
        'BIOMETRIC VERIFICATION',
      ],
      buttonText: 'CONTACT US',
      buttonVariant: 'outlined',
    },
    {
      title: 'SILVER',
      price: '100',
      description: [
        '5000 VOTERS',
        'REAL TIME ANALYTICS',
        'SMS AND EMAIL NOTIFICATIONS FOR VOTERS',
        'FINGERPRINT SCANNER',
      ],
      buttonText: 'CONTACT US',
      buttonVariant: 'outlined',
    },
    {
        title: 'GOLD',
        price: '200',
        description: [
            '10,000 VOTERS',
        'ADVANCED LIVE ANALYTICS',
        'MULTI-CHANNEL NOTIFICATIONS FOR VOTERS',
        'TWO-WAY AUTHENTICATION',
        ],
        buttonText: 'CONTACT US',
        buttonVariant: 'outlined',
    },
    {
        title: 'PLATINUM',
        price: '300',
        description: [
          '20,000 VOTERS',
        'DETAILED LIVE ANALYTICS',
        'MULTI-CHANNEL NOTIFICATIONS FOR VOTERS',
        'MULTI-WAY AUTHENTICATION',
        ],
        buttonText: 'CONTACT US',
        buttonVariant: 'outlined',
      },
  ];

  return (
    <div id="pricing">
      <div className="pricing-container">
        <h1 className="pricing-title">Pricing</h1>
        <p className="pricing-subtitle">Choose the plan that fits your needs.</p>
        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div key={index} className="pricing-card">
              <div className="pricing-card-header">
                <h2 className="pricing-card-title">{tier.title}</h2>
              </div>
              <div className="pricing-card-content">
                <div className="pricing-card-price">
                  <h3 className="pricing-card-price-amount">${tier.price}</h3>
                  <p className="pricing-card-price-period">/mo</p>
                </div>
                <ul className="pricing-card-description">
                  {tier.description.map((line, idx) => (
                    <li key={idx} className="pricing-card-description-item">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pricing-card-actions">
                <button className={`pricing-card-button ${tier.buttonVariant === 'contained' ? 'primary' : ''}`}>
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
