// src/components/Debits.js
import { NavLink } from "react-router-dom";

const Debits = (props) => {
  
	let debitsView = () => {
        let debits = props.data
        return debits.map((debit) => {
            let date = debit.date.slice(0,9);
            return (<div><li key={debit.id}><b>Amount:</b> {debit.amount} <br></br><b>Description:</b>  {debit.description} <br></br><b>Date:</b> {date}
            </li><br></br></div>)
        }) 
    }

    return (
      <div>
          <br></br>
              <NavLink to="/" activeClassName="is-active" style={{color: "#ffe54c"}}>Return to Home</NavLink>
              <br></br><br></br>
    	            <h1>Debits</h1>
                  <br></br>
                      <div id="form">
    	                    <form onSubmit={props.addDebit}>
                          <label>Amount:</label><input type="number" step='any' name="amount" />
                          <label class="inlineSpace">Description:</label><input type="text" name="description" />
                          <button class="inlineSpace" type="submit">Add Debit</button>
                          </form>
                      </div>
                    <br></br>    
        {debitsView()}  
    	</div>
    )
}
export default Debits;