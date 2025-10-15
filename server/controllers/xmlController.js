import fs from 'fs';
import xml2js from 'xml2js';
import CreditReport from '../models/CreditReport.js';

export const uploadXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    //  Validate file type (only XML)
    const validMimeTypes = ['text/xml', 'application/xml'];
    if (!validMimeTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path); 
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a valid XML file.",
      });
    }

    // Read file
    const xmlData = fs.readFileSync(req.file.path, 'utf8');
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);

    const data = result.INProfileResponse;
    if (!data) {
      return res.status(400).json({ success: false, message: "Invalid XML structure." });
    }

    // Extract data 
    const basicDetails = {
      name: data?.CAIS_Account?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.First_Name_Non_Normalized || 'N/A',
      mobile: data?.Current_Application?.Current_Application_Details?.Current_Applicant_Details?.MobilePhoneNumber || 'N/A',
      pan: data?.CAIS_Account?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_ID_Details?.Income_TAX_PAN || 'N/A',
      score: data?.SCORE?.BureauScore || 'N/A',
    };

    const reportSummary = {
      totalAccounts: data?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountTotal,
      activeAccounts: data?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountActive,
      closedAccounts: data?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountClosed,
      securedBalance: data?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_Secured,
      unsecuredBalance: data?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured,
      totalBalance: data?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_All,
      last7DaysEnquiries: data?.TotalCAPS_Summary?.TotalCAPSLast7Days,
    };

    const accounts = data?.CAIS_Account?.CAIS_Account_DETAILS?.map(a => ({
      bank: a.Subscriber_Name,
      accountNumber: a.Account_Number,
      currentBalance: a.Current_Balance,
      amountOverdue: a.Amount_Past_Due,
      address: a.CAIS_Holder_Address_Details?.City_non_normalized,
    }));

    const newReport = await CreditReport.create({ basicDetails, reportSummary, accounts });
    res.json({ success: true, data: newReport });
  } catch (err) {
    console.error("XML Processing Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to process XML." });
  }
};
