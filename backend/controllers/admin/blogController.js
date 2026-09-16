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
    next(err);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      const error = new Error("Blog not found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Blog found successfully", blog });
  } catch (err) {
    next(err);
  }
};
exports.allBlogs = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany();

    if (!blogs) {
      const error = new Error("Blogs not found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Blogs found successfully", blogs });
  } catch (err) {
    next(err);
  }
};
exports.updateBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  const { updateTitle, updateDescription, updateImage } = req.body;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      const error = new Error("Blog not found");
      error.status = 404;
      return next(error);
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
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      const error = new Error("Blog not found");
      error.status = 404;
      return next(error);
    }

    await prisma.blog.delete({ where: { id: blogId } });

    return res.status(200).json({ message: "Blog deleted succesfully" });
  } catch (err) {
    next(err);
  }
};
