import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
        // eslint-disable-next-line
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                            ₹{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                            ₹{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span> Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                            ₹{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                            ₹{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}
const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            .amount-con {
                display: flex;
                flex-direction: column; /* Stack vertically */
                gap: 1rem; /* Space between the items */
                margin-top: 2rem;

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column; /* Stack content vertically */
                    align-items: center;
                    justify-content: center;

                    h2 {
                        margin: 0;
                        font-size: 1.2rem;
                    }

                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }

                    &.balance {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .stats-con {
            grid-template-columns: repeat(4, 1fr);

            .chart-con {
                grid-column: 1 / 5;
            }

            .history-con {
                grid-column: 1 / 5;
            }
        }
    }

    @media (max-width: 992px) {
        .stats-con {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;

            .chart-con {
                grid-column: 1 / 3;
            }

            .history-con {
                grid-column: 1 / 3;
                margin-top: 2rem;
            }

            .amount-con {
                .income, .expense, .balance {
                    grid-column: 1 / -1;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            grid-template-columns: 1fr;
            gap: 1rem;

            .chart-con, .history-con {
                grid-column: 1;
                height: auto;
            }

            .amount-con {
                .income, .expense, .balance {
                    grid-column: 1;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                }
            }
        }
    }
`;


export default Dashboard
