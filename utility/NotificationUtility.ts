export const GenerateOTP = () => {
    const otp = Math.floor(100000000 + Math.random() * 900000000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return {otp, expiry};
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    // const accountSid = '';
    // const authToken = '';
    // const client = require('twilio')(accountSid, authToken);

    // const data = {
    //     body: 'OTP Anda '+otp,
    //     from: '+1863213131',
    //     to: toPhoneNumber
    // };

    // console.log(data);
    // const response = await client.message.create(data)

    // return response;
    return otp;
}