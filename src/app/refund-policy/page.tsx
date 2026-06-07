import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-medium text-brand-charcoal mb-8 border-b border-brand-slate/10 pb-4">Refund Policy</h1>

        <div className="space-y-6 text-brand-slate leading-relaxed">
          <p>
            Thank you for shopping at ZAFIRA. We value your satisfaction and strive to provide you with the best online shopping experience possible. If, for any reason, you are not completely satisfied with your purchase, we are here to help.
          </p>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Returns</h2>
            <p>
              We accept returns within 14 days from the date of purchase. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Refunds</h2>
            <p>
              Once we receive your return and inspect the item, we will notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. Please note that the refund amount will exclude any shipping charges incurred during the initial purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Exchanges</h2>
            <p>
              If you would like to exchange your item for a different size, color, or style, please contact our customer support team within 14 days of receiving your order. We will provide you with further instructions on how to proceed with the exchange.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Non-Returnable Items</h2>
            <p className="mb-2">Certain items are non-returnable and non-refundable. These include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personalized or custom-made items</li>
              <li>Perishable goods</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Damaged or Defective Items</h2>
            <p>
              In the unfortunate event that your item arrives damaged or defective, please contact us immediately. We will arrange for a replacement or issue a refund, depending on your preference and product availability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Return Shipping</h2>
            <p>
              You will be responsible for paying the shipping costs for returning your item unless the return is due to our error (e.g., wrong item shipped, defective product). In such cases, we will provide you with a prepaid shipping label.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Processing Time</h2>
            <p>
              Refunds and exchanges will be processed within 5-7 business days after we receive your returned item. Please note that it may take additional time for the refund to appear in your account, depending on your payment provider.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-brand-charcoal mb-2">Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our refund policy, please contact our customer support team. We are here to assist you and ensure your shopping experience with us is enjoyable and hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
