/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { urlFor } from '../sanity';
import { PostI } from '../typing';
interface Props {
  post: PostI;
}

const CardPost: React.FC<Props> = ({ post }) => {
  return (
    <Link key={post._id} href={`/${post.slug.current}`}>
      <a className="relative group border max-w-sm mx-auto md:max-w-full overflow-hidden rounded-md shadow-md">
        <div className="overflow-hidden">
          <img
            className="transition-transform overflow-hidden duration-300 ease-in-out group-hover:scale-110"
            src={urlFor(post.mainImage).url()}
            alt="post image"
          />
        </div>
        <div className="py-2 px-3 flex justify-between">
          <h2>
            By:
            <span className="font-bold">{post.author.name}</span>
          </h2>
          <h2>
            On:
            <span className="text-sm text-gray-500 italic">
              {new Date(post._createdAt).toLocaleString()}
            </span>
          </h2>
        </div>
        <h1 className="font-bold mx-2 my-4 text-lg">{post.title}</h1>
      </a>
    </Link>
  );
};

export default CardPost;
