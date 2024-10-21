import QR from '../models/qrModel.js';

class QRService {
  static async createQR(type, data, userId) {
    const qrData = this.handleQRType(type, data);
    const qr = await QR.create({
      data: qrData,
      type,
      userId,
    });
    
    return qr;
  }

  static handleQRType(type, data) {
    let qrData;

    switch (type) {
      case 'url':
        qrData = this.handleURL(data);
        break;
      case 'businessCard':
        qrData = this.handleBusinessCard(data);
        break;
      case 'wifi':
        qrData = this.handleWifi(data);
        break;
      case 'email':
        qrData = this.handleEmail(data);
        break;
      case 'phone':
        qrData = this.handlePhone(data);
        break;
      case 'sms':
        qrData = this.handleSMS(data);
        break;
      default:
        throw new Error('Unsupported QR type');
    }

    return {
      data: qrData,
      type,
    };
  }

  static handleURL(data, type) {
    if (!data.url) {
      throw new Error('URL is required');
    }

    return {
      url: data.url,
    };
  }

  static handleBusinessCard(data, type) {
    if (!data.name || !data.phone || !data.company || !data.email) {
      throw new Error('Name, phone, company, and email are required');
    }

    return {
      name: data.name,
      phone: data.phone,
      company: data.company,
      email: data.email,
    };
  }

  static handleWifi(data, type) {
    if (!data.ssid || !data.password || !data.encryption) {
      throw new Error('SSID, password, and encryption are required');
    }

    return {
      ssid: data.ssid,
      password: data.password,
      encryption: data.encryption,
    };
  }

  static handleEmail(data, type) {
    if (!data.email || !data.subject || !data.body) {
      throw new Error('Email, subject, and body are required');
    }

    return {
      email: data.email,
      subject: data.subject,
      body: data.body,
    };
  }

  static handlePhone(data, type) {
    if (!data.phone) {
      throw new Error('Phone is required');
    }

    return {
      phone: data.phone,
    };
  }

  static handleSMS(data, type) {
    if (!data.phone || !data.message) {
      throw new Error('Phone and message are required');
    }

    return {
      phone: data.phone,
      message: data.message,
    };
  }
}

export default QRService;
