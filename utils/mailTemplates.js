exports.addUserEmailTemplate = (templateDetail) => {
    const { firstName, lastName, password } = templateDetail;
    const subject = 'Registration  Done successfully';
    const message = `<h1>Hello ${firstName} ${lastName},</h1><br><h3>Password:${password}</h3><br>Please keep this information secure and do not share it with anyone. If you suspect that your account has been compromised, please let us know immediately.<br><br>Best regards`;
    return { subject, message };
  };
  
  exports.forgetPasswordTemplate = (templateDetail) => {
    const { firstName, otp } = templateDetail;
    const subject = 'Password reset request';
    const message = `<p>Hello ${firstName},</p>
    <p>We have sent you this email in response to your request to reset your password.</p>
  
    <p>To reset your password, Enter your OTP :${otp} will be valid for 10 mins</p>
    
    <p>We recommend that you keep your password secure and not share it with anyone.</p>`;
  
    return { subject, message };
  };
  

  exports.updatePasswordTemplate=(templateDetail)=>{
    const {firstName}=templateDetail
    const subject='Password Updated Successfully'
    const message=`<p>Hello ${firstName},</p>
    <p>You Have Successfully Updated Your Password.</p>
    
    <p>We recommend that you don't share your password to entertain anyone.</p>`;
    return {subject,message}
  }

  exports.registrationTemplate=(templateDetail)=>{
    const {firstName}=templateDetail
    const subject='Registration Successfully'
    const message=`<p>Hello ${firstName},</p>
    <p>Welcome To Our Portal .</p>
    <p>You Have Successfully Registered.</p>
    
    <p>We recommend that you don't share your credentials to get entertained.</p>`;
    return {subject,message}
    
  }

  exports.recruiterAppliedNotification=(templateDetail)=>{
    const {firstName}=templateDetail
    const subject='Candidate Applied to your job successfully'
    const message=`<p>Hello ${firstName},</p>
    <p>Someone Has Applied to your job .</p>
    <p>A Candidate has shown a response to your job.</p>`;
    return {subject,message}
  }

  exports.candidateAppliedNotification=(templateDetail)=>{
    const{firstName}=templateDetail
    const subject='Thanks for applying to a job'
    const message=`<p>Hello ${firstName},</p>
    <p>Thanks for applying for the job .</p>
    <p>We wish you a great day ahead and hope you will get your dream job.</p>`
    return {subject,message}
  }
