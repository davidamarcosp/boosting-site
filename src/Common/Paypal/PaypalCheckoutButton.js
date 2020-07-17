import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Firebase from '../../Firebase';

const PaypalCheckoutButton = ({ order }) => {

  const { authUser, setAuthUserPaymentSuccesful } = React.useContext(AuthContext);

  const paypalConf = {
    currency: 'USD',
    env: 'sandbox',
    client: {
      sandbox: 'AUtC7aoX2uK1TTHKsXvrzTLUH1pyGz0SXr0aP9RwgtXkq6STgiJsI51H9cCvJAa5AMG3OWYaRQWsxqkD',
      production: '',
    },
    style: {
      label: 'paypal',
      size: 'medium', // small | medium | large | responsive
      shape: 'pill',   // pill | rect
      color: 'gold',  // gold | blue | silver | black
      tagline: false,
    },
  };

  const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: 'Compra en Test App',
          custom: order.customer || '',
          item_list: {
            items: order.items
          },
        },
      ],
      note_to_payer: 'Contáctanos para cualquier aclaración sobre tu compra.',
    };

    // console.log(payment);
    return actions.payment.create({
      payment,
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment.execute()
      .then(response => {
        console.log('Paypal Success: ', response);
        setAuthUserPaymentSuccesful(true);
        Firebase.doRegisterOrder(response, order.description);
      })
      .then(() => {
        axios({
          url: 'https://us-central1-boosting-site.cloudfunctions.net/ReceiptEmail',
          method: 'GET',
          params: { dest: authUser.email }
        })
          .then(() => {
            console.log('Payment success mail sent');
          })
          .catch((err) => {
            console.log(err)
          });
      })
      .catch(error => {
        console.log(error);
        alert('Ocurrió un error al procesar el pago con Paypal');
      });
  };

  const onError = (error) => {
    alert('El pago con PayPal no fue realizado, vuelva a intentarlo.');
  };

  const onCancel = (data, actions) => {
    alert('El pago con PayPal no fue realizado, el usuario canceló el proceso.');
  };

  return (
    <PayPalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onAuthorize={(data, actions) => onAuthorize(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={(error) => onError(error)}
      style={paypalConf.style}
      commit
      locale="en_US"
    />

  );
}

export default PaypalCheckoutButton;