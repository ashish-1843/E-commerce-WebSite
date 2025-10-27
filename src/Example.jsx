import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Example({cartitems}) {
  const itemcount = cartitems.length;
  return (
    <>
      {/* Button to open offcanvas */}
      <button 
        className="m-3 cart-button" type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartOffcanvas"
        aria-controls="cartOffcanvas"
      >
        Open Cart 🛒 ({itemcount})
      </button>

      {/* Offcanvas Cart (opens from right) */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartOffcanvasLabel">
            Your Cart ({itemcount})
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
           {itemcount === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cartitems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <span>{item.title}</span><br></br>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}

          {itemcount > 0 && (
            <>
              <hr />
             
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Example;