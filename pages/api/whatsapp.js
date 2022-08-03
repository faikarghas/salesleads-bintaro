// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import excuteQuery from '../../utils/db'

export default async function handler(req, res) {

  let data = await excuteQuery({
    query: `SELECT id , phone, source, promo, cluster, type, CONVERT_TZ(created_at,'+00:00','+07:00') as created_at
     FROM leads WHERE lead IS NULL AND email IS NULL ORDER BY created_at DESC`
  })

  res.status(200).json({data:data})
}
