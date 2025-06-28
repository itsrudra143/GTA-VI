import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });

    // Animations for info section
    gsap.fromTo(
      ".info-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "Power3.easeOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".info-title",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Contact section animations
    gsap.fromTo(
      ".contact-form",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".contact-title",
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "Back.easeOut.config(1.7)",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[9rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[9rem] leading-none ml-20">theft</h1>
                <h1 className="text-[9rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2  scale-[3] rotate-[-20deg] h-[600px] w-[400px]"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-full h-[900px] flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[680px] w-[600px]"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[40%] py-30">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>

                <button className="bg-yellow-500 px-5 py-5 text-black mt-10 text-2xl hover:bg-yellow-400 transition-colors duration-300">
                  Download Now
                </button>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section w-full min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-10">
            <div className="container mx-auto">
              <h2 className="info-title text-white text-7xl text-center mb-20">
                Game Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="info-card bg-gray-800 p-8 rounded-lg border border-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <div className="text-yellow-500 text-5xl mb-6">
                    <i className="ri-map-2-line"></i>
                  </div>
                  <h3 className="text-white text-2xl mb-4">
                    Massive Open World
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Explore the biggest and most detailed Vice City ever
                    created. From neon-lit streets to sprawling beaches, every
                    corner tells a story.
                  </p>
                </div>

                <div className="info-card bg-gray-800 p-8 rounded-lg border border-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <div className="text-yellow-500 text-5xl mb-6">
                    <i className="ri-group-line"></i>
                  </div>
                  <h3 className="text-white text-2xl mb-4">
                    Dual Protagonists
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Play as Lucia and Jason in an epic story of crime, love, and
                    survival in the criminal underworld of Vice City.
                  </p>
                </div>

                <div className="info-card bg-gray-800 p-8 rounded-lg border border-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <div className="text-yellow-500 text-5xl mb-6">
                    <i className="ri-car-line"></i>
                  </div>
                  <h3 className="text-white text-2xl mb-4">
                    Enhanced Gameplay
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Experience next-gen graphics, realistic physics, and dynamic
                    weather systems that bring Vice City to life like never
                    before.
                  </p>
                </div>
              </div>

              <div className="text-center mt-16">
                <div className="info-card inline-block bg-gradient-to-r from-yellow-500 to-orange-500 p-1 rounded-lg">
                  <div className="bg-black px-8 py-4 rounded-lg">
                    <p className="text-white text-xl">
                      <span className="text-yellow-500">
                        Coming Soon 2025
                      </span>{" "}
                      - Pre-order now for exclusive content!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section w-full min-h-screen bg-black py-20 px-10">
            <div className="container mx-auto max-w-4xl">
              <h2 className="contact-title text-white text-7xl text-center mb-16">
                Get In Touch
              </h2>

              <div className="contact-form bg-gray-900 p-10 rounded-2xl border border-gray-700">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        className="block text-white text-xl mb-3"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors duration-300"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-white text-xl mb-3"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-white text-xl mb-3"
                      htmlFor="contact"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-white text-xl mb-3"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us what you think about GTA VI..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-10 py-4 rounded-lg text-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-gray-900 border-t border-gray-700 py-8">
            <div className="container mx-auto px-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="lines flex flex-col gap-[3px]">
                    <div className="line w-10 h-1 bg-yellow-500"></div>
                    <div className="line w-6 h-1 bg-yellow-500"></div>
                    <div className="line w-4 h-1 bg-yellow-500"></div>
                  </div>
                  <h3 className="text-2xl text-white">Rockstar Games</h3>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-lg">
                    Made with ❤️ by{" "}
                    <span className="text-yellow-500">Rudrakshi</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    © 2025 All rights reserved
                  </p>
                </div>

                <div className="flex gap-6 mt-4 md:mt-0">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                  >
                    <i className="ri-twitter-line text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                  >
                    <i className="ri-instagram-line text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                  >
                    <i className="ri-youtube-line text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
