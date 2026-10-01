import { Link, useLocation } from "react-router";

const content: Record<string, { title: string; body: string[] }> = {
  "contact-us": {
    title: "Contact Us",
    body: [
      "Our customer care team is available 9am–5pm, Monday to Friday (excluding bank holidays).",
      "Email: support@size.co.uk",
      "Live chat is the fastest way to reach us — head to the Help section and tap the chat icon.",
    ],
  },
  "track-my-order": {
    title: "Track my Order",
    body: [
      "Once your order has been dispatched you will receive a shipping confirmation email containing your tracking number.",
      "Use the tracking number with the courier's website to see the latest status of your delivery.",
    ],
  },
  "size-guides": {
    title: "Size Guides",
    body: [
      "Not sure which size to go for? Our size guides cover footwear and clothing conversions between UK, US and EU sizes.",
      "If you're between sizes we usually recommend going half a size up for footwear.",
    ],
  },
  "delivery-and-returns-info": {
    title: "Delivery and Returns Info",
    body: [
      "Free standard delivery on UK orders over £80.",
      "Standard delivery £3.99 – 3–5 working days. Express delivery £5.99 – 1–2 working days.",
      "Returns are free within 28 days of delivery, provided items are unworn and in their original packaging.",
    ],
  },
  "payment-methods": {
    title: "Payment Methods",
    body: [
      "We accept Visa, Mastercard, Maestro, American Express, PayPal, Klarna, Apple Pay and Google Pay.",
      "Payment is taken when your order is dispatched for pre-order items.",
    ],
  },
  "cookie-settings": {
    title: "Cookie Settings",
    body: [
      "Cookies help us give you the best experience on our site and allow us to make improvements.",
      "You can change your cookie preferences at any time from this page.",
    ],
  },
  "modern-slavery-statement": {
    title: "Modern Slavery Statement",
    body: [
      "We are committed to improving our practices to combat slavery and human trafficking.",
      "This statement is made pursuant to section 54 of the Modern Slavery Act 2015.",
    ],
  },
  corporate: {
    title: "Corporate",
    body: [
      "Information for investors, press enquiries and corporate partnerships.",
      "Email: corporate@size.co.uk",
    ],
  },
  "student-discount": {
    title: "Student Discount",
    body: [
      "Students get 20% off. Verify your student status through our verification partner and your unique discount code will be generated.",
      "T&Cs apply. Exclusions apply on selected brands and launches.",
    ],
  },
  "emergency-services-discount": {
    title: "Emergency Services Discount",
    body: [
      "Emergency services and blue light workers get 20% off as a thank you.",
      "Verify your status through our verification partner to receive your code. T&Cs apply.",
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    body: [
      "These terms and conditions govern your use of our website and the purchase of products.",
      "By placing an order you agree to be bound by these terms.",
    ],
  },
  klarna: {
    title: "Klarna",
    body: [
      "Klarna lets you pay in 3 interest-free instalments or up to 30 days later.",
      "Klarna's Pay in 3 / Pay in 30 days are unregulated credit agreements. Borrowing more than you can afford or paying late may negatively impact your financial status and ability to obtain credit. 18+, UK residents only. Subject to status. T&Cs apply.",
    ],
  },
  "become-an-affiliate": {
    title: "Become an Affiliate",
    body: [
      "Join our affiliate programme and earn commission on every sale you refer.",
      "Sign up through our affiliate partner network and start earning today.",
    ],
  },
  "gift-cards": {
    title: "Gift Cards",
    body: [
      "Give the gift of choice with a digital gift card, delivered straight to your inbox.",
      "Gift cards are valid for 12 months from the date of purchase and can be used online.",
    ],
  },
  faqs: {
    title: "FAQs",
    body: [
      "Find answers to the most frequently asked questions about orders, delivery, returns and payments.",
      "If you can't find the answer you're looking for, contact our customer care team.",
    ],
  },
  accessibility: {
    title: "Accessibility",
    body: [
      "We are committed to making our website accessible to all customers.",
      "If you experience any difficulty using our site, please contact us so we can assist with your order.",
    ],
  },
  weee: {
    title: "WEEE",
    body: [
      "The Waste Electrical and Electronic Equipment (WEEE) Directive requires the collection and recycling of electrical equipment.",
      "We facilitate the return and recycling of electronic items in line with these regulations.",
    ],
  },
  cookies: {
    title: "Cookies",
    body: [
      "We use cookies to personalise content, provide social media features and analyse our traffic.",
      "Read our cookie policy to learn more about the cookies we use and how to manage them.",
    ],
  },
  careers: {
    title: "Careers",
    body: [
      "Want to join the team? From head office to warehouse and store roles, view our latest vacancies.",
      "Email: careers@size.co.uk",
    ],
  },
  "site-security": {
    title: "Site Security",
    body: [
      "Your security is our priority. All payments are processed over a secure connection.",
      "We never store your full card details on our servers.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We take your privacy seriously and handle your data in accordance with UK GDPR.",
      "Read our full privacy policy to see how we collect, use and protect your information.",
    ],
  },
};

export default function InfoPage() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop() ?? "";
  const page = content[slug] ?? {
    title: "Information",
    body: ["This page is coming soon."],
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/"
        className="text-sm font-semibold underline underline-offset-4 hover:text-orange-500"
      >
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold md:text-4xl">{page.title}</h1>
      <div className="mt-6 space-y-4">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
