import { CalendarPlus, Camera, Search, UserCheck } from 'lucide-react'
import React from 'react'
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

      {/* footer section */}
        <footer className="footer footer-horizontal footer-center bg-medium-purple-800 text-white rounded p-10">
          <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
          <aside>
            <p>Copyright © {new Date().getFullYear()} - VirtualMeet. All rights reserved</p>
          </aside>
        </footer>
    </div>
  )
}

export default LandingPage
