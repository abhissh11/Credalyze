import React from 'react'
import { Link } from 'react-router-dom'
import {ArrowRight} from "lucide-react"

export default function HomePage() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center min-h-[80svh]'>
    <h1 className='text-4xl font-extrabold text-gray-100 text-center'>Transform XML Credit Data into <br /> Clear <span className='text-pink-500'>Financial Insights </span></h1>
    <p className='text-base font-normal text-gray-300'>Upload your Experian XML files and instantly view structured reports with <br /> credit summaries, account details, and score analytics</p>
    <Link to="/upload">
    <button className='group flex gap-1 items-center px-4 py-2 rounded-lg bg-white text-black text-base font-normal mt-4 cursor-pointer hover:bg-gray-100'>Start Analysing Your XML <span><ArrowRight size={20} className='group-hover:translate-x-1.5 transition delay-100' /> </span> </button>
    </Link>
    </div>
  )
}
