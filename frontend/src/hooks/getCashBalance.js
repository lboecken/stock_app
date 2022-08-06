import { useState } from "react";
import axios from "axios";

export default function FetchCashBalance (signedInUser) {
    const [userCashBalance, setUserCashBalance] = useState(0);
    async function updateCashBalance () {
        await axios.get("api/cash_balance/" + signedInUser).then((res) => {
            // console.log(res.data[0].cash_balance);
            setUserCashBalance(Number(res.data[0].cash_balance));
         
          });
    }

    return {
        setUserCashBalance,
        updateCashBalance,
        userCashBalance
    }
}