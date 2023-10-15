
const splitName = (name: string) => {
  if (name.includes(".mp3")) {
    return name.split(".mp3")[0];
  }

  if (name.includes(".wav")) {
    return name.split(".wav")[0];
  }

  if (name.includes(".ogg")) {
    return name.split(".ogg")[0];
  }

  if (name.includes(".m4a")) {
    return name.split(".m4a")[0];
  }

  if (name.includes(".aac")) {
    return name.split(".aac")[0];
  }

  if (name.includes(".wma")) {
    return name.split(".wma")[0];
  }

  if (name.includes(".flac")) {
    return name.split(".flac")[0];
  }

  if (name.includes(".alac")) {
    return name.split(".alac")[0];
  }

  if (name.includes(".aiff")) {
    return name.split(".aiff")[0];
  }

  if (name.includes(".dsd")) {
    return name.split(".dsd")[0];
  }

  if (name.includes(".dsf")) {
    return name.split(".dsf")[0];
  }

  if (name.includes(".dff")) {
    return name.split(".dff")[0];
  }

  if (name.includes(".mp2")) {
    return name.split(".mp2")[0];
  }

  if (name.includes(".mp1")) {
    return name.split(".mp1")[0];
  }

  if (name.includes(".mpa")) {
    return name.split(".mpa")[0];
  }

  if (name.includes(".mka")) {
    return name.split(".mka")[0];
  }

  if (name.includes(".m3u")) {
    return name.split(".m3u")[0];
  }

  if (name.includes(".pls")) {
    return name.split(".pls")[0];
  }

  if (name.includes(".cue")) {
    return name.split(".cue")[0];
  }

  if (name.includes(".webm")) {
    return name.split(".webm")[0];
  }

  if (name.includes(".aac")) {
    return name.split(".aac")[0];
  }

  if (name.includes(".aif")) {
    return name.split(".aif")[0];
  }

  if (name.includes(".aifc")) {
    return name.split(".aifc")[0];
  }

  if (name.includes(".amr")) {
    return name.split(".amr")[0];
  }

  if (name.includes(".ape")) {
    return name.split(".ape")[0];
  }

  if (name.includes(".au")) {
    return name.split(".au")[0];
  }
};

export default splitName;