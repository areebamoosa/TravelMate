const prisma = require("../../prisma");

exports.postBlog = async (req, res, next) => {
  const { title, description, image } = req.body;

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        image,
      },
    });

    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog found successfully", blog });
  } catch (err) {
    console.log(err);
  }
};
exports.allBlogs = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany();

    if (!blogs) {
      return res.status(404).json({ message: "Blogs not found" });
    }

    return res.status(200).json({ message: "Blogs found successfully", blogs });
  } catch (err) {
    console.log(err);
  }
};
exports.updateBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  const { updateTitle, updateDescription, updateImage } = req.body;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    updateBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: updateTitle,
        description: updateDescription,
        image: updateImage,
      },
    });

    return res
      .status(200)
      .json({ message: "Blog updated succesfully", updateBlog });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await prisma.blog.delete({ where: { id: blogId } });

    return res.status(200).json({ message: "Blog deleted succesfully" });
  } catch (err) {
    console.log(err);
  }
};
