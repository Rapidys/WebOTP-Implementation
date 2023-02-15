import React, {useEffect, useState} from "react";
import OtpInput from "./OTPInput";

const App = () => {

    const [otp, setOtp] = useState('');
    const onChange = (value) => setOtp(value);


    useEffect(() => {
        if ("OTPCredential" in window) {
            const ac = new AbortController();

            navigator.credentials
                .get({
                    otp: {transport: ["sms"]},
                    signal: ac.signal,
                })
                .then((otp) => {
                    setOtp(otp.code)
                    ac.abort();
                })
                .catch((err) => {
                    ac.abort();
                    console.log(err);
                });
        }
    }, [])


    return (
        <div className="App" style={{display: 'flex', marginTop: '100px', marginLeft: 10}}>
            <OtpInput value={otp} valueLength={6} onChange={onChange}/>
        </div>
    );
}

export default App