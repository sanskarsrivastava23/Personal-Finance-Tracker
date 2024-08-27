import { Card, Row } from "antd";
import React from 'react';
import "./styles.css";
function Cards({income,
  expense,
  totalBalance, showExpenseModal, showIncomeModal}) {
  return (
    <div>
        <Row className="my-row">
      <Card bordered={true} className="my-card">
        <h2>Current Balance</h2>
        <p>₹{totalBalance}</p>
        <div class="btn btn-blue" style={{ margin: 0 }} >
          Reset Balance
        </div>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Income</h2>
        <p>₹{income}</p>
        <div
          class="btn btn-blue"
          style={{ margin: 0 }}
          onClick={showIncomeModal}
        >
          Add Income
        </div>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Expenses</h2>
        <p>₹{expense}</p>
        <div className="btn btn-blue" 
        style={{margin: 0}}
        onClick={showExpenseModal}>
          Add Expense
        </div>
      </Card>
        </Row>
    </div>
  )
}

export default Cards
