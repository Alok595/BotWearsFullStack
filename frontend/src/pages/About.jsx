
import { FaCheckCircle, FaUsers, FaBolt, FaHeadset } from "react-icons/fa";
import img from "../assets/back4.jpeg";
import NewsletterBox from "../components/NewLetterBox";

const About = () => {
  return (
    <section className="w-full bg-gray-900 text-gray-200 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={img}
            alt="About Us"
            className="rounded-2xl shadow-lg w-full max-w-md hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* About Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            About <span className="text-blue-500">Our Company</span>
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            We are a team of creators, engineers, and dreamers dedicated to
            crafting digital solutions that inspire innovation and growth. Our
            mission is to empower brands and individuals to reach their full
            potential in the digital era.
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We combine design thinking, cutting-edge technology, and data-driven
            strategy to deliver seamless user experiences and measurable
            results.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-10">
          Why <span className="text-blue-500">Choose Us?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
            <FaCheckCircle className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-lg font-semibold mb-2">Trusted Expertise</h4>
            <p className="text-gray-400 text-sm">
              Years of experience delivering reliable, high-quality digital
              products for our clients worldwide.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
            <FaUsers className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-lg font-semibold mb-2">Client-Focused</h4>
            <p className="text-gray-400 text-sm">
              We value collaboration and build long-term partnerships that
              prioritize our clients' success.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
            <FaBolt className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-lg font-semibold mb-2">Innovation Driven</h4>
            <p className="text-gray-400 text-sm">
              We embrace creativity and new technologies to deliver
              forward-thinking, scalable solutions.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
            <FaHeadset className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-400 text-sm">
              Our dedicated support team ensures you always have the help you
              need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Stats / Highlights Section */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 text-center gap-8">
        <div>
          <h3 className="text-3xl font-extrabold text-blue-500">10+</h3>
          <p className="text-gray-400 text-sm">Years of Experience</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-blue-500">500+</h3>
          <p className="text-gray-400 text-sm">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-blue-500">1200+</h3>
          <p className="text-gray-400 text-sm">Projects Completed</p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-blue-500">24/7</h3>
          <p className="text-gray-400 text-sm">Customer Support</p>
        </div>
      </div>
      <NewsletterBox />
    </section>
  );
};

export default About;
