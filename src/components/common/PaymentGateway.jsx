import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './CommonComponents.css';

export const PaymentGateway = ({ amount, description, onSuccess, onFailure }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const { addNotification } = useAppContext();

  // Payment methods available
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: '🏦'
    }
  ];

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  // Handle card input changes
  const handleCardInput = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'number':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        break;
      case 'cvv':
        formattedValue = value.slice(0, 3);
        break;
      default:
        break;
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Validate card details
  const validateCardDetails = () => {
    const { number, expiry, cvv, name } = cardDetails;
    
    if (number.replace(/\s/g, '').length !== 16) {
      throw new Error('Invalid card number');
    }
    
    if (expiry.length !== 5) {
      throw new Error('Invalid expiry date');
    }
    
    const [month, year] = expiry.split('/');
    const now = new Date();
    const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    
    if (cardDate < now) {
      throw new Error('Card has expired');
    }
    
    if (cvv.length !== 3) {
      throw new Error('Invalid CVV');
    }
    
    if (name.trim().length < 3) {
      throw new Error('Invalid card holder name');
    }
  };

  // Validate UPI ID
  const validateUpiId = () => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    if (!upiRegex.test(upiId)) {
      throw new Error('Invalid UPI ID');
    }
  };

  // Process payment
  const processPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate based on payment method
      if (selectedMethod === 'card') {
        validateCardDetails();
      } else if (selectedMethod === 'upi') {
        validateUpiId();
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      const paymentResult = {
        id: 'pay_' + Math.random().toString(36).substr(2, 9),
        amount,
        currency: 'INR',
        status: 'success',
        method: selectedMethod,
        timestamp: new Date().toISOString()
      };

      // Add success notification
      addNotification({
        title: 'Payment Successful',
        message: `Payment of ₹${amount} was processed successfully`,
        type: 'payment'
      });

      onSuccess(paymentResult);
    } catch (error) {
      // Add failure notification
      addNotification({
        title: 'Payment Failed',
        message: error.message,
        type: 'alert'
      });

      onFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form">
      <h3>Complete Payment</h3>

      <div className="payment-summary">
        <div className="summary-item">
          <span>Amount</span>
          <span>₹{amount.toLocaleString()}</span>
        </div>
        {description && (
          <div className="summary-item">
            <span>Description</span>
            <span>{description}</span>
          </div>
        )}
        <div className="summary-total">
          <span>Total</span>
          <span>₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="payment-methods">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="payment-method-icon">{method.icon}</div>
            <div className="payment-method-name">{method.name}</div>
          </div>
        ))}
      </div>

      <form onSubmit={processPayment}>
        {selectedMethod === 'card' && (
          <div className="card-details">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="number"
                value={cardDetails.number}
                onChange={handleCardInput}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Expiry Date</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInput}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardCvv">CVV</label>
                <input
                  type="password"
                  id="cardCvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInput}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardName">Card Holder Name</label>
              <input
                type="text"
                id="cardName"
                name="name"
                value={cardDetails.name}
                onChange={handleCardInput}
                placeholder="John Doe"
                required
              />
            </div>
          </div>
        )}

        {selectedMethod === 'upi' && (
          <div className="upi-details">
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@upi"
                required
              />
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div className="netbanking-details">
            <div className="form-group">
              <label>Select Bank</label>
              <select required>
                <option value="">Select a bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="payment-button"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
        </button>
      </form>

      <div className="payment-secure-info">
        🔒 Your payment information is secure and encrypted
      </div>
    </div>
  );
};
