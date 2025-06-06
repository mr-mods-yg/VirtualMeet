import { CalendarPlus, Search, UserCheck } from 'lucide-react'
import React from 'react'
import Footer from '../components/Footer'
function LandingPage() {
  return (
    <div className='font-poppins smooth-scroll bg-medium-purple-400'>
      {/* hero section */}
      <section id='hero' className='h-[72vh] flex flex-col items-center justify-center text-center'>
        <div className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-22">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div className='text-5xl m-2 text-bold'>
          All in one collaborative platform
        </div>
        <div className='text-lg m-2 text-medium'>
          Create, manage, and connect — the smarter way to host virtual events.
        </div>
        <a className='btn btn-primary p-4 m-2 text-thin rounded-4xl bg-medium-purple-600' href='/login'>Let's Get Started!</a>

      </section>
      {/* features section */}
      <section id='features' className='flex flex-col items-center justify-start mb-20'>
        <div className='text-2xl sm:text-3xl p-20 text-bold'>
          Why use Virtual Meet?
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 m-4'>
          {/* <div className="card w-96 shadow">
            <div className="card-body items-center text-center bg-medium-purple-700 text-medium-purple-200">
              <Camera size={50} />
              <h2 className="card-title text-medium">Screen Sharing & Video Call Chats</h2>
              <p className='text-thin'>Enable real-time collaboration and discussions</p>
            </div>
          </div> */}
          <div className="card shadow w-full max-w-80">
            <div className="card-body items-center text-center bg-medium-purple-700 text-medium-purple-200">
              <CalendarPlus size={50} />
              <h2 className="card-title text-medium">Create & Manage Events</h2>
              <p className='text-thin'>Easily create events, set schedules, and manage all your event details in one place.</p>
            </div>
          </div>
          <div className="card shadow w-full max-w-80">
            <div className="card-body items-center text-center bg-medium-purple-700 text-medium-purple-200">
              <Search size={50} />
              <h2 className="card-title text-medium">Explore & Discover Events</h2>
              <p className='text-thin'>Find and explore events that match your interests.</p>
            </div>
          </div>
          <div className="card shadow w-full max-w-80">
            <div className="card-body items-center text-center bg-medium-purple-700 text-medium-purple-200">
              <UserCheck size={50} />
              <h2 className="card-title text-medium">Register & Join Effortlessly</h2>
              <p className='text-thin'>Quick registration process and instant access to your chosen events.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default LandingPage
