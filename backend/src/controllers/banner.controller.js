import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import imagekit from "../config/imagekit.js";

// GET Banner
export const getBanner = async (req, res) => {
  try {
    const banner = await prisma.banner.findFirst({
      orderBy: { id: "desc" },
    });

    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banner" });
  }
};



// CREATE or UPDATE Banner
export const saveBanner = async (req, res) => {
  try {
    let image_url_1 = null;
    let image_url_2 = null;

    // upload image1
    if (req.files?.image1?.[0]) {
      const file = req.files.image1[0];

      const uploaded = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
      });

      image_url_1 = uploaded.url;
    }

    // upload image2
    if (req.files?.image2?.[0]) {
      const file = req.files.image2[0];

      const uploaded = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
      });

      image_url_2 = uploaded.url;
    }

    const existing = await prisma.banner.findFirst();

    if (existing) {
      const updated = await prisma.banner.update({
        where: { id: existing.id },
        data: {
          image_url_1: image_url_1 || existing.image_url_1,
          image_url_2: image_url_2 || existing.image_url_2,
        },
      });

      return res.json(updated);
    }

    const newBanner = await prisma.banner.create({
      data: {
        image_url_1,
        image_url_2,
      },
    });

    res.json(newBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save banner" });
  }
};