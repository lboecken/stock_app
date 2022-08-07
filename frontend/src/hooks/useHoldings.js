import { useState} from "react";
import axios from "axios";

export default function useHoldings (signedInUser) {
    const [totalHoldingsValue, setTotalHoldingsValue] = useState('');
    const [totalHoldings, setTotalHoldings] = useState("");
    const [allHoldings, setAllHoldings] = useState("");
    async function updateHoldings () {
        await axios.get("api/holdings/" + signedInUser).then((res) => {
            setTotalHoldingsValue(res.data.total_value);
            setTotalHoldings(res.data);
            setAllHoldings(res.data.all_holdings_value)
      
            console.log(res.data);
          });
    }

    return {
        totalHoldings,
        setTotalHoldings,
        totalHoldingsValue,
        setTotalHoldingsValue,
        updateHoldings,
        allHoldings
    
    }
}