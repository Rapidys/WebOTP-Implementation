import React, {useEffect, useRef, useState} from "react";

const App = () => {

    const [otp, setOTP] = useState('')
    const inputRef = useRef()


    useEffect(() => {
        if ("OTPCredential" in window) {
            const ac = new AbortController();

            navigator.credentials
                .get({
                    otp: {transport: ["sms"]},
                    signal: ac.signal,
                })
                .then((otp) => {
                    inputRef.current.value = otp.code
                    ac.abort();
                })
                .catch((err) => {
                    ac.abort();
                    console.log(err);
                });
        }
    }, [])

    useEffect(() => {
        alert(otp)
    }, [otp])

    return (
        <div className="App">
            <input type="text" autocomplete="one-time-code" ref={inputRef} onChange={() => setOTP(inputRef.current.value)}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Your OTP is: {otp}</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3>The Web OTP API Docs</h3>
            <div>
                Send an SMS that includes
                <pre>
            <code>@web-otp-shravan.netlify.app #12345</code>
          </pre>
                at the last line to this phone.
                <pre>
            <code>please don't use https:// and / end of the url</code>
          </pre>
                <pre style={{color: "green"}}>
            <code>example for use @www.google.com</code>
          </pre>
                <pre style={{color: "red"}}>
            <code>example for not use XXXXX @https://www.google.com XXXXX</code>
          </pre>
            </div>
        </div>
    );
}

export default App