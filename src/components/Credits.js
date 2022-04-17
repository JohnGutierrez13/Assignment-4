// src/components/credits.js
import { NavLink } from "react-router-dom";

function Credits(props) {
    let creditsView = () => {
        let credits = props.data;
        return credits.map((debit) => {
            let date = debit.date.slice(0, 9);
            return (<div><li key={debit.id}><b>Amount:</b> {debit.amount} <br></br><b>Description:</b>  {debit.description} <br></br><b>Date:</b> {date}
            </li><br></br></div>);
        });
    };

    return (
        <div>
            <br></br>
            <NavLink to="/" activeClassName="is-active">Return to Home</NavLink>
            <br></br><br></br>
            <h1>Credits</h1>
            <br></br>
            <div>
                <form onSubmit={props.addCredit}>
                    <label>Amount:</label><input type="number" step='any' name="amount" />
                    <label class="inlineSpace">Description:</label><input type="text" name="description" />
                    <button class="inlineSpace" type="submit">Add Credit</button>
                </form>
            </div>
            <br></br>
            {creditsView()}
        </div>

    );
}
export default Credits;