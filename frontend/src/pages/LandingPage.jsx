import React from 'react'
import image from '../assets/linkedin-sales-solutions.jpg'
function LandingPage() {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex-col text-center'>
        <div className='text-secondary text-4xl p-10 underline decoration-solid'>
          All-in-One Virtual Event Solution
        </div>
        <div className="flex">
          <div className='hidden lg:inline flex-0.6'>
            <img src={image} alt="" className='rounded-md' />
            <p className='text-sm'>Photo by <a href="https://unsplash.com/@linkedinsalesnavigator?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">LinkedIn Sales Solutions</a> on <a href="https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-sitting-on-red-and-brown-couch-9KrLgnMc3OE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></p>

          </div>
          <div className='flex-1 text-center'>
            <div className="text-2xl">From live streaming to audience engagement – everything in one place!</div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "🎥", title: "Live Streaming & Webinars" },
              { icon: "📹", title: "Screen Sharing & Video Calls" },
              { icon: "💬", title: "Live Chat & Q&A" },
              { icon: "📅", title: "Event Scheduling & Management" },
              { icon: "🎟️", title: "Registration" },
              { icon: "📊", title: "Analytics & Insights" },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md text-center">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-xl font-semibold mt-2">{feature.title}</h3>
              </div>
            ))}
          </div>
            <a className="btn btn-xl btn-active btn-secondary" href='/login'>Get Started</a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LandingPage
