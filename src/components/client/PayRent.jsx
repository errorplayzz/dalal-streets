import { useState } from 'react';
import './ClientComponents.css';

export const PayRent = ({ user }) => {
  const [activeTab, setActiveTab] = useState('payments');
  
  // Mock payment history - in a real app, this would come from a database
  const mockPaymentHistory = [
    {
      id: 'PAY123456',
      amount: 12000,
      date: '2025-03-01',
      status: 'Paid',
      property: 'Comfort PG, Koramangala',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'PAY123455',
      amount: 12000,
      date: '2025-02-01',
      status: 'Paid',
      property: 'Comfort PG, Koramangala',
      paymentMethod: 'UPI'
    },
    {
      id: 'PAY123454',
      amount: 12000,
      date: '2025-01-01',
      status: 'Paid',
      property: 'Comfort PG, Koramangala',
      paymentMethod: 'Net Banking'
    }
  ];
  
  // Mock pending payments - in a real app, this would come from a database
  const mockPendingPayments = [
    {
      id: 'INV123457',
      amount: 12000,
      dueDate: '2025-04-01',
      property: 'Comfort PG, Koramangala',
      description: 'April 2025 Rent'
    }
  ];

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bank: ''
  });

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayNow = (paymentId) => {
    if (!paymentInfo.paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    // In a real app, this would handle the payment process
    alert(`Payment initiated for ID: ${paymentId}. In a real app, this would process the payment.`);
  };

  const renderPaymentsTab = () => (
    <div className="payments-tab">
      <div className="pending-payments">
        <h3>Pending Payments</h3>
        {mockPendingPayments.length > 0 ? (
          <div className="pending-payments-list">
            {mockPendingPayments.map(payment => (
              <div className="payment-card" key={payment.id}>
                <div className="payment-details">
                  <h4>{payment.description}</h4>
                  <p className="payment-property">{payment.property}</p>
                  <p className="payment-amount">₹{payment.amount.toLocaleString('en-IN')}</p>
                  <p className="payment-due-date">Due by: {new Date(payment.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                <div className="payment-methods">
                  <h4>Select Payment Method</h4>
                  <div className="payment-method-options">
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentInfo.paymentMethod === 'card'}
                        onChange={handlePaymentInfoChange}
                      />
                      Credit/Debit Card
                    </label>
                    
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentInfo.paymentMethod === 'upi'}
                        onChange={handlePaymentInfoChange}
                      />
                      UPI
                    </label>
                    
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentInfo.paymentMethod === 'netbanking'}
                        onChange={handlePaymentInfoChange}
                      />
                      Net Banking
                    </label>
                  </div>
                  
                  {paymentInfo.paymentMethod === 'card' && (
                    <div className="card-details">
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentInfo.paymentMethod === 'upi' && (
                    <div className="upi-details">
                      <div className="form-group">
                        <label htmlFor="upiId">UPI ID</label>
                        <input
                          type="text"
                          id="upiId"
                          name="upiId"
                          value={paymentInfo.upiId}
                          onChange={handlePaymentInfoChange}
                          placeholder="example@upi"
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentInfo.paymentMethod === 'netbanking' && (
                    <div className="netbanking-details">
                      <div className="form-group">
                        <label htmlFor="bank">Select Bank</label>
                        <select
                          id="bank"
                          name="bank"
                          value={paymentInfo.bank}
                          onChange={handlePaymentInfoChange}
                        >
                          <option value="">Select a bank</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <button
                    className="pay-now-button"
                    onClick={() => handlePayNow(payment.id)}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-pending-payments">
            <p>You have no pending payments.</p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderHistoryTab = () => (
    <div className="history-tab">
      <h3>Payment History</h3>
      {mockPaymentHistory.length > 0 ? (
        <div className="payment-history-table">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{new Date(payment.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>{payment.property}</td>
                  <td>₹{payment.amount.toLocaleString('en-IN')}</td>
                  <td>{payment.paymentMethod}</td>
                  <td className={`payment-status ${payment.status.toLowerCase()}`}>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-payment-history">
          <p>You have no payment history yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="pay-rent-container">
      <div className="rent-tabs">
        <button
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Pending Payments
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          Payment History
        </button>
      </div>
      
      <div className="rent-content">
        {activeTab === 'payments' ? renderPaymentsTab() : renderHistoryTab()}
      </div>
    </div>
  );
};
