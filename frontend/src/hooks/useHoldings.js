import { useState} from "react";
import axios from "axios";

export default function useHoldings (signedInUser) {
    const [totalHoldingsValue, setTotalHoldingsValue] = useState('');
    const [totalHoldings, setTotalHoldings] = useState("");
    async function updateHoldings () {
        await axios.get("api/holdings/" + signedInUser).then((res) => {
            setTotalHoldingsValue(res.data.total_value);
            setTotalHoldings(res.data);
      
            console.log(res.data);
          });
    }

    return {
        totalHoldings,
        setTotalHoldings,
        totalHoldingsValue,
        setTotalHoldingsValue,
        updateHoldings
    }
}