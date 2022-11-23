## About Next.js API Routes

API Routes is a great feature in Next.js where you basically create api endpoints and then they are deployed as serverless functions on AWS Lambda. Next.js API routes are built on top of [micro](https://github.com/vercel/micro) a library by vercel for asynchronous HTTP microservices. A lot of people are using them for their projects in production and have had a really smooth DX.

## The confusion

There have been debates about using Next.js API routes on social media mainly because of the confusion surrounding it. I have had people asking about whether they can use their prebuilt api with Next.js(yes, you can.) or using Next.js Custom Server as a replacement for their backend(which is a completely different thing) but sometimes it can be confusing especially for people just getting started with a framework like Next.js which has a lot to offer.

## Why all people using Next.js in full stack apps are not using API routes?

Some people are not using Next.js API routes because it just don't fulfil their requirements or adds more overhead than other existing alternatives. Some have their backend built already but just need Next.js for its frontend capabilities.

Concerns like Next.js API routes being stateless and unable to execute any piece of code once the response is sent back to the client is also a factor for some people especially the ones who integrate time consuming third party services or who want to perform side effects after sending response. Though there are workarounds to deal with this scenario, but it is found that they add more overhead in the development process and semetimes lead to develop antipatterns for building backends.

## So what you should do?

Next.js API routes are the best if you don't have many complicated backend tasks to do. A great benefit of using it also includes that you don't have to worry about deploying your backend to any other place. You can just deploy your next.js project to vercel and your api is ready to be consumed once your project is live.

But towards the end, the fact remains that it all depends on the use case or sometimes your personal preference(as in the case of this project).

Now lets come back to this project. So, I am using Express.js over Next.js API routes for the following reasons-

1. I am using a similar setup in some of my production websites where working with express.js makes more sense for my use case than Next.js API routes so I decided to do the same here too since it makes my life easier.
2. I might build a mobile app in future for this project, so I preferred to build an api separate from Next.js frontend code.
