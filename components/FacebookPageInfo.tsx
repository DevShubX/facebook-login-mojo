import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const FaceBookPageInfo = () => {
  const { data: session } = useSession();
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [insights, setInsights] = useState<any>([{
    "name": "post_reactions_like_total",
    "period": "lifetime",
    "values": [
      {
        "value": 226
      }
    ],
    "title": "Lifetime Total Like Reactions of a post.",
    "description": "Lifetime: Total like reactions of a post.",
    "id": "{page-post-id}/insights/post_reactions_like_total/lifetime"
  },
  {
    "name": "post_reactions_love_total",
    "period": "lifetime",
    "values": [
      {
        "value": 17
      }
    ],
    "title": "Lifetime Total Love Reactions of a post.",
    "description": "Lifetime: Total love reactions of a post.",
    "id": "{page-post-id}/insights/post_reactions_love_total/lifetime"
  },
  {
    "name": "post_reactions_wow_total",
    "period": "lifetime",
    "values": [
      {
        "value": 1
      }
    ],
    "title": "Lifetime Total wow Reactions of a post.",
    "description": "Lifetime: Total wow Reactions of a post.",
    "id": "{page-post-id}/insights/post_reactions_wow_total/lifetime"
  },
  {
    "name": "post_reactions_wo_total",
    "period": "lifetime",
    "values": [
      {
        "value": 1
      }
    ],
    "title": "Lifetime Total wow Reactions of a post.",
    "description": "Lifetime: Total wow Reactions of a post.",
    "id": "{page-post-id}/insights/post_reactions_wow_total/lifetime"
  }]);


  useEffect(() => {
    if (session) {
      fetchPages();
    }

  }, [session]);

  const fetchPages = async () => {
    try {
      const response = await axios.get(`https://graph.facebook.com/v22.0/${session?.user.id}/accounts?access_token=${session?.user.access_token}`);
      if (response.status === 200) {
        setPages(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchInsights = async () => {
    try {

      // I have implemnented the since and until with hard coded values.
      const since = "2024-01-01";
      const until = "2024-01-31";
      const metrics = "page_follows,page_post_engagements,page_impression,page_actions_post_reactions_like_total";
      const response = await axios.get(`https://graph.facebook.com/v22.0/${selectedPage}/insights?metric=${metrics}&since=${since}&until=${until}&period=total_over_range&access_token=${session?.user?.access_token}`)
      setInsights(response.data);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (selectedPage) {
      fetchInsights();
    }
  }, [selectedPage]);

  return (
    <div>
      <h1 className='my-5 text-lg'>
        The Business login api is not letting me login but so i am using dummy data
        <br />
        I have coded the API endpoint for you to see.
        <br />
        <br />
        <br />
        Dummy Data*
      </h1>
      <select onChange={(e) => { setSelectedPage(e.target.value) }} className='p-2 text-xl rounded-lg border border-black/50 mb-6'>
        <option value="">Select a Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>{page.name}</option>
        ))}
      </select>


      {insights && (
        <div className="grid grid-cols-4 gap-4">
          {insights.map((insight: any) => (
            <div key={insight.name} className="p-4 border rounded flex flex-col gap-y-2">
              <h3 className='text-xl' >{insight.title}</h3>
              <p className='text-lg'>{insight.values[0].value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FaceBookPageInfo