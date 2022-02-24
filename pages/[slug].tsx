/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PortableText } from '@portabletext/react';
import { groq } from 'next-sanity';
import { sanityClient, urlFor } from '../sanity';
import { PostI } from '../typing';
import Header from '../components/Header';

interface Props {
  post: PostI;
}
const PostDetail = ({ post }: Props) => {
  console.log(post);

  return (
    <>
      <Header />
      <main>
        <img
          className="w-full h-48 object-cover  object-center"
          src={urlFor(post.mainImage).url()}
          alt="post"
        />
        <article className="max-w-5xl mx-auto py-8 px-10 lg:px-0">
          <h1 className="text-4xl my-4 font-bold">{post.title}</h1>
          <h2 className="font-bold text-lg my-2">{post.author.name}</h2>
          <p className="text-gray-600 text-sm">
            publishedAt:{' '}
            <span className="italic">
              {new Date(post._createdAt).toLocaleString()}
            </span>
          </p>
          <div className="mt-6 richtext-container">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>
    </>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[type=='post']{
        _id,
        slug{
            current
        }
    }`;
  const posts: [PostI] = await sanityClient.fetch(query);
  const paths = posts.map(post => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  const query = groq`*[_type=='post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name
        },
        'comments': *[_type=='comments' && post._ref == ^._id && approved == true],
        body,
        mainImage,
        slug,
    }`;

  const post: PostI = await sanityClient.fetch(query, { slug });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
