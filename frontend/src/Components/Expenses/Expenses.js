import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';

function Expenses() {
    const { expenses,getExpenses, setExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    // Get token from local storage
    // const token = JSON.parse(localStorage.getItem('auth'))?.token;
    // const token = localStorage.getItem('token');
    // // Function to fetch expenses with token
    // const fetchExpenses = async () => {
    //     try {
    //         const res = await axios.get('expenses', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log('User Data ',res.data)
    //         setExpenses(res.data); // Update context with fetched expenses
    //     } catch (error) {
    //         console.error("Failed to fetch expenses:", error);
    //     }
    // };

    useEffect(() => {
        getExpenses()
        // eslint-disable-next-line
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
`;

export default Expenses;

// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import IncomeItem from '../IncomeItem/IncomeItem';
// import ExpenseForm from './ExpenseForm';

// function Expenses() {
//     const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

//     useEffect(() =>{
//         getExpenses()
//         // eslint-disable-next-line
//     }, [])
//     return (
//         <ExpenseStyled>
//             <InnerLayout>
//                 <h1>Expenses</h1>
//                 <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
//                 <div className="income-content">
//                     <div className="form-container">
//                         <ExpenseForm />
//                     </div>
//                     <div className="incomes">
//                         {expenses.map((income) => {
//                             const {_id, title, amount, date, category, description, type} = income;
//                             console.log(income)
//                             return <IncomeItem
//                                 key={_id}
//                                 id={_id} 
//                                 title={title} 
//                                 description={description} 
//                                 amount={amount} 
//                                 date={date} 
//                                 type={type}
//                                 category={category} 
//                                 indicatorColor="var(--color-green)"
//                                 deleteItem={deleteExpense}
//                             />
//                         })}
//                     </div>
//                 </div>
//             </InnerLayout>
//         </ExpenseStyled>
//     )
// }

// const ExpenseStyled = styled.div`
//     display: flex;
//     overflow: auto;
//     .total-income{
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         background: #FCF6F9;
//         border: 2px solid #FFFFFF;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         border-radius: 20px;
//         padding: 1rem;
//         margin: 1rem 0;
//         font-size: 2rem;
//         gap: .5rem;
//         span{
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-green);
//         }
//     }
//     .income-content{
//         display: flex;
//         gap: 2rem;
//         .incomes{
//             flex: 1;
//         }
//     }
// `;

// export default Expenses