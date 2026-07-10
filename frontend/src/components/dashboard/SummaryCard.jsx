import "../../styles/summaryCard.css";

function SummaryCard({
    title,
    amount,
    icon,
    color,
    subtitle,
}) {

    return (

        <div
            className="summary-card"
            style={{
                borderTop: `5px solid ${color}`,
            }}
        >

            <div className="summary-header">

                <div className="summary-icon">

                    {icon}

                </div>

                <div>

                    <h4>{title}</h4>

                    <small>{subtitle}</small>

                </div>

            </div>


            <h2>

                ₹ {amount.toLocaleString()}

            </h2>

        </div>

    );

}

export default SummaryCard;