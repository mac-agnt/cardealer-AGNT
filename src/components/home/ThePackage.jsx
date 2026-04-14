import './ThePackage.css';

const WEBSITE_IMG = '/car dealer website template.png';
const WORKSPACE_IMG = '/car dealer dashbaord template.png';

export default function ThePackage() {
  return (
    <section className="pkg section" id="package" aria-labelledby="package-heading">
      <div className="container">
        <header className="pkg__header reveal">
          <p className="section-label">The package</p>
          <h2 id="package-heading" className="pkg__title">
            Premium website <span className="text-gradient">and the workspace behind it</span>
          </h2>
          <p className="pkg__lede">
            AGNT pairs a conversion-led public site with dealer-grade tools, so what buyers see online matches how your
            team runs stock, enquiries, WhatsApp, appointments, and admin.
          </p>
        </header>

        <div className="pkg__build">
          <div className="pkg__block pkg__block--public reveal-sm">
            <div className="pkg__block-visual">
              <div className="pkg__shot">
                <img src={WEBSITE_IMG} alt="AGNT premium dealer website with stock grid and vehicle listings" loading="lazy" />
              </div>
            </div>
            <div className="pkg__block-body">
              <h3 className="pkg__block-title">Public-facing website</h3>
              <p className="pkg__block-lede">
                A proper Irish dealer site: fast on mobile, sharp on stock, and built for people who are already serious
                about buying.
              </p>
              <ul className="pkg__block-list">
                <li>
                  Fully branded layout: homepage, used and new stock, finance, sell your car, service, EV hub, offers,
                  about, contact
                </li>
                <li>Strong discovery: quick search, filters, “Just Arrived,” and tabs for segments that suit your forecourt</li>
                <li>Listing pages with gallery, specs, vehicle file, finance estimates, cash/monthly toggle, walkaround video</li>
                <li>Reservations, WhatsApp prompts, and quick enquiry paths where they convert, not buried in the footer</li>
              </ul>
            </div>
          </div>

          <div className="pkg__block pkg__block--internal reveal-sm">
            <div className="pkg__block-visual">
              <div className="pkg__shot">
                <img
                  src={WORKSPACE_IMG}
                  alt="AGNT dealer workspace dashboard with stock and lead overview"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="pkg__block-body">
              <h3 className="pkg__block-title">Dealer workspace</h3>
              <p className="pkg__block-lede">
                The engine room: KPIs, vehicles, listings, and every enquiry channel in one place, so the yard is not
                running on spreadsheets and separate logins.
              </p>
              <ul className="pkg__block-list">
                <li>Dashboard home with vehicles, listings, leads, and inventory health at a glance</li>
                <li>
                  Lead management across website, WhatsApp, Carzone, DoneDeal, and Cars Ireland: searchable, with source
                  and status
                </li>
                <li>WhatsApp AI sales agent plus human takeover; appointments with booking source, notes, and statuses</li>
                <li>
                  Customer profiles / CRM, digitised documents, automated admin workflows, import calculator, branding
                  tools, Social Studio, settings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
