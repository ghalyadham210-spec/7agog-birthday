import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// ── DATA ─────────────────────────────────────────────────────────────────────
const PHOTOS = [
  {
    src: "https://i.ibb.co/spkcJB0P/7agog4.jpg",
    msg: "يا حجوج… كل لحظة معاك بتفضل في قلبي للأبد 💛",
  },
  {
    src: "https://i.ibb.co/sJv0WVLy/7agog2.jpg",
    msg: "أنت مش بس أبويا… أنت صاحبي وملهمي في الحياة ❤️",
  },
  {
    src: "https://i.ibb.co/rKcQftpW/7agog5.jpg",
    msg: "فخور بيك كل يوم… ربنا يخليك ليّا طول عمرك 🌟",
  },
  {
    src: "https://i.ibb.co/svz9cKG4/7agog1.jpg",
    msg: "ضحكتك دي أغلى حاجة في الدنيا عندي 😄",
  },
  {
    src: "https://i.ibb.co/cKJ4QVtB/7agog3.jpg",
    msg: "كل سنة وأنت نور عيني وفرحتي يا أبويا 🎂✨",
    isFinal: true,
  },
];

const PASSWORD = "7agog";

// ── HELPERS ───────────────────────────────────────────────────────────────────
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

// ── PARTICLES ────────────────────────────────────────────────────────────────
function Confetti({ count = 80 }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#A855F7", "#F97316", "#EC4899"][
      i % 6
    ],
    size: randomBetween(6, 14),
    delay: randomBetween(0, 1.5),
    duration: randomBetween(2.5, 5),
    rotate: randomBetween(0, 360),
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [p.rotate, p.rotate + 540],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Balloons({ count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(5, 95),
    color: ["#FFD700", "#FF6B6B", "#A855F7", "#F97316", "#4ECDC4", "#EC4899"][
      i % 6
    ],
    size: randomBetween(40, 70),
    delay: randomBetween(0, 2),
    duration: randomBetween(4, 8),
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {items.map((b) => (
        <motion.div
          key={b.id}
          className="absolute flex flex-col items-center"
          style={{ left: `${b.x}%`, bottom: -100, width: b.size }}
          animate={{ y: [0, -window.innerHeight - 200] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-full relative"
            style={{
              width: b.size,
              height: b.size * 1.2,
              backgroundColor: b.color,
              boxShadow: `0 0 20px ${b.color}66`,
            }}
          >
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-white opacity-40" />
          </div>
          <div
            className="w-px bg-gray-400 opacity-50"
            style={{ height: b.size * 0.8 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    delay: randomBetween(0, 3),
    size: randomBetween(20, 50),
    duration: randomBetween(4, 8),
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-red-400"
          style={{ left: `${h.x}%`, bottom: -60, fontSize: h.size }}
          animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

// ── 3-D GIFT BOX ─────────────────────────────────────────────────────────────
function GiftBox({ isOpen, onOpen }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start({
        scale: [1, 1.3, 0.95, 1.15, 1],
        rotate: [0, -8, 8, -5, 5, 0],
        transition: { duration: 0.7 },
      });
    }
  }, [isOpen]);

  const lidVariants = {
    closed: { rotateX: 0, y: 0 },
    open: {
      rotateX: -140,
      y: -30,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ perspective: 800 }}
      animate={controls}
      onClick={!isOpen ? onOpen : undefined}
      whileHover={!isOpen ? { scale: 1.05 } : {}}
      whileTap={!isOpen ? { scale: 0.97 } : {}}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, #FFD70066 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* BOX BODY */}
      <div className="relative" style={{ width: 200, height: 180 }}>
        {/* body */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden"
          style={{
            height: 130,
            background:
              "linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #7c2d12 100%)",
            boxShadow: "0 20px 60px #dc262660, inset 0 1px 0 #ffffff22",
          }}
        >
          {/* ribbon vertical */}
          <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-90" />
          {/* shine */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-white opacity-10 skew-x-12" />
        </div>

        {/* LID */}
        <motion.div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 55,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          variants={lidVariants}
          animate={isOpen ? "open" : "closed"}
        >
          <div
            className="w-full h-full rounded-t-lg"
            style={{
              background:
                "linear-gradient(135deg, #991b1b 0%, #ef4444 50%, #991b1b 100%)",
              boxShadow: "0 -4px 20px #dc262640, inset 0 1px 0 #ffffff22",
            }}
          >
            {/* ribbon horizontal */}
            <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 h-6 w-full bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 opacity-90" />
            {/* ribbon vertical on lid */}
            <div className="absolute inset-x-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-90" />
            {/* BOW */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1">
              <div
                className="w-8 h-8 rounded-full border-4 border-yellow-400 bg-yellow-300 opacity-90"
                style={{ transform: "rotate(-30deg)" }}
              />
              <div
                className="w-8 h-8 rounded-full border-4 border-yellow-400 bg-yellow-300 opacity-90"
                style={{ transform: "rotate(30deg)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Glow from inside when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
              style={{ width: 120, height: 80, background: "#FFD700" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {!isOpen && (
        <motion.p
          className="text-center mt-4 text-yellow-300/70 text-sm font-light tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          اضغط لتفتح 🎁
        </motion.p>
      )}
    </motion.div>
  );
}

// ── LOGIN SCREEN ──────────────────────────────────────────────────────────────
function LoginScreen({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | opening | done

  const handleBoxOpen = () => {
    setPhase("opening");
  };

  const handleSubmit = () => {
    if (pw === PASSWORD) {
      setBoxOpen(true);
      setPhase("done");
      setTimeout(onSuccess, 1800);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPw("");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a0a00 0%, #0d0d0d 70%)",
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: randomBetween(1.5, 4),
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          🎂 Happy Birthday
        </h1>
        <p className="text-yellow-200/60 tracking-widest text-sm uppercase">
          يا أغلى أب في الدنيا
        </p>
      </motion.div>

      {/* Gift Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <GiftBox isOpen={boxOpen} onOpen={handleBoxOpen} />
      </motion.div>

      {/* Password area */}
      <AnimatePresence>
        {(phase === "opening" || phase === "done") && (
          <motion.div
            className="w-full max-w-xs flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-yellow-300/80 text-sm tracking-wide">
              أدخل الكلمة السرية 🔑
            </p>
            <motion.div
              className="w-full"
              animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••"
                className="w-full text-center text-xl tracking-widest rounded-2xl py-3 px-6 outline-none text-yellow-200 placeholder-yellow-900/60"
                style={{
                  background: "#1a1000cc",
                  border: "1.5px solid #FFD70050",
                  boxShadow: "0 0 20px #FFD70020, inset 0 1px 0 #ffffff10",
                }}
                autoFocus
              />
            </motion.div>
            <motion.button
              onClick={handleSubmit}
              className="w-full py-3 rounded-2xl font-bold tracking-widest text-black text-lg"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                boxShadow: "0 4px 30px #FFD70060",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 40px #FFD70090" }}
              whileTap={{ scale: 0.97 }}
            >
              ✨ افتح الهدية
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── BOOM SCREEN ───────────────────────────────────────────────────────────────
function BoomScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: "#0d0d0d" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti count={100} />
      <Balloons count={14} />
      <motion.div
        className="text-center select-none"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: [0, 1.4, 1.1, 1.2], rotate: [0, 10, -5, 0] }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="text-9xl mb-4">💥</div>
        <motion.h1
          className="text-6xl md:text-8xl font-black"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #FFD700, #FF6B6B, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          BOOM!
        </motion.h1>
        <motion.p
          className="text-yellow-300 text-2xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🎉 كل سنة وأنت طيب يا حجوج! 🎉
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ── PHOTO CARD ────────────────────────────────────────────────────────────────
function PhotoCard({ photo, onNext, index, total }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
    const t = setTimeout(() => setFlipped(true), 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {/* Card with 3D flip */}
      <motion.div
        className="w-full rounded-3xl overflow-hidden mb-6 relative"
        style={{
          boxShadow: "0 20px 80px #FFD70040, 0 0 0 1px #FFD70020",
          perspective: 800,
        }}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img
          src={photo.src}
          alt={`Photo ${index + 1}`}
          className="w-full object-cover"
          style={{ maxHeight: 340 }}
        />
        {/* overlay shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, #ffffff08 50%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>

      {/* Message */}
      <motion.p
        className="text-center text-lg md:text-xl mb-8 leading-relaxed px-2"
        style={{
          fontFamily: "'Cairo', sans-serif",
          color: "#FFD700",
          textShadow: "0 0 20px #FFD70060",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {photo.msg}
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              background: i === index ? "#FFD700" : "#FFD70030",
            }}
          />
        ))}
      </div>

      {!photo.isFinal && (
        <motion.button
          onClick={onNext}
          className="px-10 py-4 rounded-2xl font-bold text-xl text-black"
          style={{
            fontFamily: "'Cairo', sans-serif",
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            boxShadow: "0 6px 40px #FFD70070",
          }}
          whileHover={{ scale: 1.06, boxShadow: "0 10px 50px #FFD700aa" }}
          whileTap={{ scale: 0.96 }}
        >
          التالي ✨
        </motion.button>
      )}
    </motion.div>
  );
}

// ── MAIN GALLERY SCREEN ───────────────────────────────────────────────────────
function GalleryScreen() {
  const [phase, setPhase] = useState("cta"); // cta | photos | finale
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleBigButton = () => setPhase("photos");

  const handleNext = () => {
    const next = photoIndex + 1;
    if (next >= PHOTOS.length) {
      setPhase("finale");
    } else {
      setPhotoIndex(next);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #1a0a00 0%, #0a0a0a 80%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background shimmer */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: "#FFD700",
          }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: randomBetween(2, 5),
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {phase === "cta" && (
          <motion.div
            key="cta"
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              يا حجوج 👑
            </motion.h2>
            <p
              className="text-yellow-200/70 text-lg"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              عندنا مفاجأة صغيرة ليك…
            </p>
            <motion.button
              onClick={handleBigButton}
              className="relative px-12 py-6 rounded-3xl text-black font-black text-2xl md:text-3xl overflow-hidden"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background:
                  "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
                boxShadow: "0 8px 50px #FFD700aa, 0 0 0 2px #FFD70040",
              }}
              whileHover={{ scale: 1.07, boxShadow: "0 12px 70px #FFD700cc" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 8px 50px #FFD700aa",
                  "0 8px 70px #FFD700ff",
                  "0 8px 50px #FFD700aa",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, #ffffff30 50%, transparent 70%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              دوس هنا يا حجوج 🎁
            </motion.button>
          </motion.div>
        )}

        {phase === "photos" && (
          <motion.div key={`photo-${photoIndex}`} className="w-full">
            <AnimatePresence mode="wait">
              <PhotoCard
                key={photoIndex}
                photo={PHOTOS[photoIndex]}
                onNext={handleNext}
                index={photoIndex}
                total={PHOTOS.length}
              />
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "finale" && <FinaleScreen />}
      </AnimatePresence>
    </motion.div>
  );
}

// ── FINALE ────────────────────────────────────────────────────────────────────
function FinaleScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #3b0000 0%, #0a0a0a 80%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingHearts />
      <Confetti count={80} />
      <Balloons count={10} />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        className="relative z-10"
      >
        <div className="text-7xl mb-6">🎂</div>
        <motion.h1
          className="text-4xl md:text-6xl font-black mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #FFD700, #FF6B6B, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          كل سنة وأنت طيب
          <br />
          يا حجوج! 🌟
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-yellow-200/90 leading-relaxed max-w-lg mx-auto"
          style={{ fontFamily: "'Cairo', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          ربنا يكرمك ويطول في عمرك ويخليك لينا… أنت أغلى حاجة عندنا في الدنيا 💛
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {["🎉", "🎊", "💛", "🥳", "❤️", "✨", "🎁", "👑"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | boom | gallery

  return (
    <div className="font-sans" dir="rtl">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cairo:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0d; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div key="login">
            <LoginScreen onSuccess={() => setScreen("boom")} />
          </motion.div>
        )}
        {screen === "boom" && (
          <motion.div key="boom">
            <BoomScreen onDone={() => setScreen("gallery")} />
          </motion.div>
        )}
        {screen === "gallery" && (
          <motion.div key="gallery">
            <GalleryScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
