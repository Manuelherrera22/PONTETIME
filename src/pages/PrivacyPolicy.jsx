import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <SEO
                title="Privacy Policy | PonteTIME"
                description="Our commitment to protecting your personal information. Read the PonteTIME Privacy Policy."
            />
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif text-luxury-black mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg text-gray-600">
                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to PonteTIME. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">2. The Data We Collect</h2>
                        <p className="mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">3. How We Use Your Data</h2>
                        <p className="mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">4. Cookies</h2>
                        <p className="mb-4">
                            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                            If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">5. Data Security</h2>
                        <p className="mb-4">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-serif text-luxury-black mb-4">6. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        </p>
                        <p className="font-bold text-luxury-black">
                            Email: privacy@pontetime.com<br />
                            Address: Paseo de la Reforma, Mexico City
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
