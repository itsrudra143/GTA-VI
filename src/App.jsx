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

    // Simplified info section animations - just fade in once
    gsap.fromTo(
      ".info-title",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "Power2.easeOut",
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Simple card entrance animation
    gsap.fromTo(
      ".info-card",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "Power2.easeOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Video section animations
    gsap.fromTo(
      ".video-title",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "Power2.easeOut",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".video-container",
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "Power2.easeOut",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Simple coming soon animation
    gsap.to(".glitch-text", {
      x: "random(-1, 1)",
      duration: 0.2,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }, [showContent]);

  return (
    <footer>
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

          <div className="w-full h-[900px] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-900">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full overflow-hidden">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[680px] w-[600px] transition-transform duration-500 hover:scale-[1.4]"
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

          {/* Enhanced Info Section with Timeline Design */}
          <div className="info-section relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-16 px-10">
            <div className="container mx-auto relative z-10">
              <h2 className="info-title text-white text-7xl text-center mb-20 relative">
                Game Features
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              </h2>

              {/* Timeline Layout */}
              <div className="relative max-w-6xl mx-auto">
                {/* Central timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500"></div>

                {/* Feature 1 - Left */}
                <div className="info-card relative flex items-center mb-20">
                  <div className="w-1/2 pr-12 text-right">
                    <div className="bg-gradient-to-l from-gray-800/80 to-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 group">
                      <h3 className="text-yellow-500 text-4xl mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        Massive Open World
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300 font-[Helvetica_Now_Display]">
                        Explore the biggest and most detailed Vice City ever
                        created. From neon-lit streets to sprawling beaches,
                        every corner tells a story of crime and ambition.
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black shadow-lg shadow-yellow-500/50 z-10"></div>

                  <div className="w-1/2 pl-12">
                    <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 group">
                      <img
                        src="./image2.jpg"
                        alt="Open World"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Feature 2 - Right */}
                <div className="info-card relative flex items-center mb-20">
                  <div className="w-1/2 pr-12">
                    <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 group">
                      <img
                        src="./image3.jpg"
                        alt="Dual Protagonists"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-black shadow-lg shadow-orange-500/50 z-10"></div>

                  <div className="w-1/2 pl-12 text-left">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 group">
                      <h3 className="text-orange-500 text-4xl mb-4 group-hover:text-orange-400 transition-colors duration-300">
                        Dual Protagonists
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300 font-[Helvetica_Now_Display]">
                        Play as Lucia and Jason in an epic story of crime, love,
                        and survival in the criminal underworld of Vice City's
                        dangerous streets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 - Left */}
                <div className="info-card relative flex items-center mb-20">
                  <div className="w-1/2 pr-12 text-right">
                    <div className="bg-gradient-to-l from-gray-800/80 to-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 group">
                      <h3 className="text-yellow-500 text-4xl mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        Enhanced Gameplay
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300 font-[Helvetica_Now_Display]">
                        Experience next-gen graphics, realistic physics, and
                        dynamic weather systems that bring Vice City to life
                        like never before.
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black shadow-lg shadow-yellow-500/50 z-10"></div>

                  <div className="w-1/2 pl-12">
                    <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 group">
                      <img
                        src="./image1.jpg"
                        alt="Enhanced Gameplay"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="info-card inline-block relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 p-1 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
                  <div className="relative bg-black px-12 py-6 rounded-2xl">
                    <p className="text-white text-2xl">
                      <span className="text-yellow-500 font-black text-2xl">
                        COMING SOON 2025
                      </span>{" "}
                      <br />
                      <span className="text-lg mt-2 block font-[Helvetica_Now_Display]">
                        Pre-order now for exclusive content!
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="video-section relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-10 flex items-center justify-center">
            <div className="container mx-auto max-w-6xl relative z-10">
              <h2 className="video-title text-white text-7xl text-center mb-20 relative">
                Watch The Trailer
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              </h2>

              <div className="video-container relative rounded-3xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 group">
                <video
                  className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="./video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

                {/* Video title overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-white text-4xl mb-2">
                    Grand Theft Auto VI
                  </h3>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-400 text-xl font-[Helvetica_Now_Display]">
                  Experience the next generation of open-world gaming
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-10">
            <div className="container mx-auto max-w-5xl relative z-10">
              <h2 className="text-white text-7xl text-center mb-20 relative">
                Get In Touch
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              </h2>

              <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-lg p-12 rounded-3xl border-2 border-gray-700/50 shadow-2xl font-[Helvetica_Now_Display] overflow-hidden">
                <form className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label
                        className="block text-white text-xl mb-4 "
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-5 bg-gray-800/70 border-2 border-gray-600/50 rounded-xl text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-white text-xl mb-4 "
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-5 bg-gray-800/70 border-2 border-gray-600/50 rounded-xl text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-white text-xl mb-4 "
                      htmlFor="contact"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      className="w-full p-5 bg-gray-800/70 border-2 border-gray-600/50 rounded-xl text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-white text-xl mb-4 "
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="w-full p-5 bg-gray-800/70 border-2 border-gray-600/50 rounded-xl text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none backdrop-blur-sm text-lg"
                      placeholder="Tell us what you think about GTA VI..."
                    ></textarea>
                  </div>

                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-black  px-16 py-6 rounded-2xl text-2xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-500/30 overflow-hidden"
                    >
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-gradient-to-b from-gray-900 to-black border-t border-gray-700 py-8">
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

                <div className="text-center font-[Helvetica_Now_Display]">
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
    </footer>
  );
}

export default App;
