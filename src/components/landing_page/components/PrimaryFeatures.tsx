import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import backgroundImage from '../images/background-features.jpg'
// import screenshot3DModels from '../images/screenshots/3DModels.png'
// import screenshotMinigames from '../images/screenshots/targetedMinigames.jpeg'
// import screenshotAccessibility from '../images/screenshots/Test.png'
import screenshotDemo from '../images/screenshots/3d-demo.png'
import screenshotInventory from '../images/screenshots/inventory-demo.png'
import screenshotLogo from '../images/screenshots/3jslogo.png'
import Container from './Container'
const features = [
  {
    title: 'Hyper-realistic 3D Models',
    description:
      'Our 3D models are so realistic, you might forget you are in a virtual world.',
          image: screenshotDemo,
        },
        {
          title: 'Targeted Minigames',
          description:
          'Our minigames are designed to help you master specific skills and improve your performance.',
          // image: screenshotPayroll,
          image: screenshotInventory,
        },
        {
          title: 'High Accessibility',
          description:
          'Our app is built on the web using three.js, making it easy for you to access from anywhere.',
          // image: screenshotPayroll,
          image: screenshotLogo,
  },
]
// const features = [
//   {
//     title: 'Payroll',
//     description:
//       "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
//     image: screenshotPayroll,
//   },
//   {
//     title: 'Claim expenses',
//     description:
//       "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
//     image: screenshotExpenses,
//   },
//   {
//     title: 'VAT handling',
//     description:
//       "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
//     image: screenshotVatReturns,
//   },
//   {
//     title: 'Reporting',
//     description:
//       'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.',
//     image: screenshotReporting,
//   },
// ]

export default function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features of Quest2Learn Modules"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-16"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Learn everything you need for virtual labs.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            We provide bespoke mixed reality modules that tailor towards your learner needs.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white'
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[55rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}