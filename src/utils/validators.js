export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.emailOrUsername) {
    errors.emailOrUsername = 'Email or username is required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.username) {
    errors.username = 'Username is required';
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username)) {
    errors.username = 'Username must be 3-20 characters (letters, numbers, underscore)';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.role) {
    errors.role = 'Please select a role';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validatePostForm = (data) => {
  const errors = {};

  if (!data.content || data.content.trim().length === 0) {
    if (!data.image && !data.video) {
      errors.content = 'Post must have content, image, or video';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateVideoUpload = (data, videoFile) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!videoFile) {
    errors.video = 'Video file is required';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};