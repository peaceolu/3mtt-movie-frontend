"use client";
import { motion } from "motion/react";
import { alfa_Slab_One } from "@/app/fonts";
import Searchbar from "../Searchbar";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hero() {
	return (
		<section className="flex flex-col items-center rounded-none justify-center h-fit  pt-24 md:py-20 gap-10 w-full text-center bg-[url(/movie.jpg)] bg-center bg-cover bg-blend-overlay bg-slate-900/50">
			<div className="px-5 md:px-20 rounded-md flex flex-col items-center justify-center w-full h-fit">
				<div className=" flex flex-col gap-5 items-center text-center  justify-center w-full">
					<motion.p
						initial={{ transform: "translateY(-100%)" }}
						whileInView={{ transform: "translate(0)" }}
						exit={{ transform: "translate(-100%), rotate(180deg)" }}
						transition={{ duration: 0.4, type: "spring" }}
						className={`${alfa_Slab_One.className} text-[#ADF802] text-l md:text-2xl font-semibold`}
					>
						Manage your movies, watchlists, and more with our intuitive
						platform.
					</motion.p>
				</div>
				<Searchbar />
			</div>
		</section>
	);
}
