import { TabScreenHeader } from "@/components/tab-screen-header";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView, type VideoPlayer } from "expo-video";
import { Eye, Heart, Play, VolumeX, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

{
  /* All types of community posts --> NativeWindV2 adaptive from these */
}

type FilterId =
  | "all"
  | "demos"
  | "research"
  | "mentors"
  | "testimonials"
  | "events";

type SortId = "recent" | "views" | "likes";

type AspectRatio = "video" | "portrait";

type VideoKind = "stream" | "file" | "youtube";

interface CommunityPost {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  playbackUrl: string;
  videoKind: VideoKind;
  categoryLabel: string;
  categoryBg: string;
  categoryText: string;
  timeAgo: string;
  views: number;
  likes: number;
  featured?: boolean;
  aspect: AspectRatio;
  filter: FilterId;
  sortRecent: number;
}

{
  /* Video Helpers */
}

function muxStreamUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

function youtubeIdFromUrl(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /img\.youtube\.com\/vi\/([^/]+)\//,
    /[?&]v=([^&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
}

{
  /* Filter Area */
}

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "demos", label: "Student demos" },
  { id: "research", label: "Student Research" },
  { id: "mentors", label: "Mentor intros" },
  { id: "testimonials", label: "Testimonials" },
  { id: "events", label: "Event Showcase" },
];

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "recent", label: "Most Recent" },
  { id: "views", label: "Most Viewed" },
  { id: "likes", label: "Most Liked" },
];

const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "biocompute",
    title: "Founder, BioCompute, A DNA data storage company",
    description: "Introduction from anagha",
    thumbnailUrl:
      "https://image.mux.com/yjId5sch8etntoiraycbjcwBB94KIcWdy4CnZdyAepU/thumbnail.webp?time=15",
    playbackUrl: muxStreamUrl("yjId5sch8etntoiraycbjcwBB94KIcWdy4CnZdyAepU"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "13 days ago",
    views: 9,
    likes: 0,
    featured: true,
    aspect: "video",
    filter: "mentors",
    sortRecent: 13,
  },
  {
    id: "linda-an",
    title: "Meet Linda An",
    description: "Introduction from Linda An",
    thumbnailUrl:
      "https://image.mux.com/W1T1azcdqldoi6B3Kv02QYBARpUj9MCoER02tqfjs7Pe4/thumbnail.webp?time=15",
    playbackUrl: muxStreamUrl("W1T1azcdqldoi6B3Kv02QYBARpUj9MCoER02tqfjs7Pe4"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "20 days ago",
    views: 4,
    likes: 0,
    aspect: "video",
    filter: "mentors",
    sortRecent: 20,
  },
  {
    id: "michael-cruz",
    title: "Meet Michael Cruz",
    description: "Introduction from Michael Cruz",
    thumbnailUrl:
      "https://image.mux.com/PEUZNAqUSDnpPnZkbiH0100Fe3OEJPDJ02Gwp1MDUUMSGk/thumbnail.webp?time=15&fit_mode=preserve",
    playbackUrl: muxStreamUrl("PEUZNAqUSDnpPnZkbiH0100Fe3OEJPDJ02Gwp1MDUUMSGk"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "20 days ago",
    views: 1,
    likes: 0,
    aspect: "portrait",
    filter: "mentors",
    sortRecent: 20,
  },
  {
    id: "tarush",
    title: "Tarush Gupta",
    thumbnailUrl:
      "https://image.mux.com/xOx7VMOq4602QKidpuY01CqvyKeLbEMQu301M7urf5YU5I/thumbnail.webp?time=60&pinned=1",
    playbackUrl: muxStreamUrl("xOx7VMOq4602QKidpuY01CqvyKeLbEMQu301M7urf5YU5I"),
    videoKind: "stream",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "27 days ago",
    views: 3,
    likes: 0,
    featured: true,
    aspect: "portrait",
    filter: "demos",
    sortRecent: 27,
  },
  {
    id: "planet-protectors",
    title: "Planet Protectors: The Dragon's Promise",
    description:
      "An animated short with subtitles about protecting our planet, told through dragons.",
    thumbnailUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/thumbnails/1777107061104_Azai_Planet_Protectors_-_The_Dragons__Promise__Subtitles_1777105346392.jpg",
    playbackUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/1777107061104_Azai_Planet_Protectors_-_The_Dragons__Promise__Subtitles_1777105346392.mp4",
    videoKind: "file",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "27 days ago",
    views: 8,
    likes: 0,
    featured: true,
    aspect: "video",
    filter: "demos",
    sortRecent: 27,
  },
  {
    id: "parent-azai",
    title: "Parent Testimonial : Ayesha on Azai's builder journey",
    thumbnailUrl: "https://img.youtube.com/vi/kJN0zsSgu3Q/hqdefault.jpg",
    playbackUrl: "https://www.youtube.com/watch?v=kJN0zsSgu3Q",
    videoKind: "youtube",
    categoryLabel: "From Parents",
    categoryBg: "#FF8A65",
    categoryText: "#3A1A0E",
    timeAgo: "27 days ago",
    views: 1,
    likes: 0,
    aspect: "portrait",
    filter: "testimonials",
    sortRecent: 27,
  },
  {
    id: "gasguard",
    title: "GasGuard",
    description: "A safety-focused gas leak detection prototype.",
    thumbnailUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/thumbnails/1777107072038_GasGuardDemo_1777105352965.jpg",
    playbackUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/1777107072038_GasGuardDemo_1777105352965.mp4",
    videoKind: "file",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "27 days ago",
    views: 1,
    likes: 0,
    aspect: "video",
    filter: "demos",
    sortRecent: 27,
  },
  {
    id: "trady",
    title: "Trady",
    description:
      "A friendly trading sidekick that helps young learners explore market ideas.",
    thumbnailUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/thumbnails/1777107070458_DevPrasanna_Trady__1__1777105346396.jpg",
    playbackUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/community-media/1777107070458_DevPrasanna_Trady__1__1777105346396.mp4",
    videoKind: "file",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "27 days ago",
    views: 0,
    likes: 0,
    aspect: "video",
    filter: "demos",
    sortRecent: 27,
  },
  {
    id: "vidyashankar",
    title: "Meet Professor Vidyashankar — Mentor at BlueRobins",
    description: "He teaches at Srishti School of Design and Technology",
    thumbnailUrl:
      "https://image.mux.com/BDEqP2nkOChyO8xeKgXAbvNfEVE7H7UAvQP8X2npcJ8/thumbnail.webp?time=15",
    playbackUrl: muxStreamUrl("BDEqP2nkOChyO8xeKgXAbvNfEVE7H7UAvQP8X2npcJ8"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "7 weeks ago",
    views: 66,
    likes: 0,
    aspect: "portrait",
    filter: "mentors",
    sortRecent: 49,
  },
  {
    id: "akshath",
    title: "Meet Akshath — Math & Engineering Expert",
    thumbnailUrl:
      "https://image.mux.com/Oid2e0201yQOF4JKfjlle9FO9Icmy1xUGbC54An6CNbhE/thumbnail.webp?time=15",
    playbackUrl: muxStreamUrl("Oid2e0201yQOF4JKfjlle9FO9Icmy1xUGbC54An6CNbhE"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "11 weeks ago",
    views: 229,
    likes: 0,
    aspect: "portrait",
    filter: "mentors",
    sortRecent: 77,
  },
  {
    id: "suhaani",
    title: "Student Demo - Suhaani showcasing her sports analytics project",
    thumbnailUrl: "https://img.youtube.com/vi/b1UPWrpdhlg/hqdefault.jpg",
    playbackUrl: "https://www.youtube.com/watch?v=b1UPWrpdhlg",
    videoKind: "youtube",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "11 weeks ago",
    views: 76,
    likes: 0,
    featured: true,
    aspect: "video",
    filter: "demos",
    sortRecent: 77,
  },
  {
    id: "rishab",
    title: "Student Demo - Rishab discussing his cancer project",
    thumbnailUrl: "https://img.youtube.com/vi/Ud83-68a_us/hqdefault.jpg",
    playbackUrl: "https://www.youtube.com/watch?v=Ud83-68a_us",
    videoKind: "youtube",
    categoryLabel: "Student Stories",
    categoryBg: "#5EEAD4",
    categoryText: "#0F4D43",
    timeAgo: "10 weeks ago",
    views: 116,
    likes: 0,
    aspect: "video",
    filter: "demos",
    sortRecent: 70,
  },
  {
    id: "davidson",
    title: "Meet Mentor : Davidson — UC Berkeley Math & Data Science",
    thumbnailUrl:
      "https://image.mux.com/PeJjtJf1P02R8syyAHV2eG9RHkFllQTeD02vvuwMl7nIU/thumbnail.webp?time=15",
    playbackUrl: muxStreamUrl("PeJjtJf1P02R8syyAHV2eG9RHkFllQTeD02vvuwMl7nIU"),
    videoKind: "stream",
    categoryLabel: "Mentor Spotlight",
    categoryBg: "#FDB515",
    categoryText: "#2B3674",
    timeAgo: "11 weeks ago",
    views: 150,
    likes: 0,
    featured: true,
    aspect: "portrait",
    filter: "mentors",
    sortRecent: 77,
  },
];

function NativeCommunityPlayer({
  uri,
  aspect,
}: {
  uri: string;
  aspect: AspectRatio;
}) {
  const { width } = useWindowDimensions();
  const playerHeight =
    aspect === "portrait" ? width * (4 / 3) : width * (9 / 16);

  const player = useVideoPlayer(uri, (instance: VideoPlayer) => {
    instance.play();
  });

  return (
    <VideoView
      player={player}
      style={{ width: "100%", height: playerHeight, backgroundColor: "#000" }}
      contentFit="contain"
      nativeControls
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}

const MODAL_HEADER_ROW_HEIGHT = 48;

function CommunityVideoModal({
  post,
  visible,
  onClose,
}: {
  post: CommunityPost | null;
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const youtubeId =
    post?.videoKind === "youtube" ? youtubeIdFromUrl(post.playbackUrl) : null;

  const headerHeight = insets.top + 8 + MODAL_HEADER_ROW_HEIGHT + 12;

  if (!post) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black">
        {visible ? (
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
        ) : null}

        {/* Above VideoView/WebView — native video surfaces steal touches otherwise */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            elevation: 30,
            paddingTop: insets.top + 8,
            paddingBottom: 12,
            paddingHorizontal: 16,
            backgroundColor: "rgba(0,0,0,0.92)",
          }}
        >
          <View className="min-h-12 flex-row items-center justify-between">
            <Text
              className="flex-1 pr-3 text-base font-semibold text-white"
              numberOfLines={2}
            >
              {post.title}
            </Text>
            <Pressable
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="h-11 w-11 items-center justify-center rounded-full bg-white/20"
              accessibilityLabel="Close video"
              accessibilityRole="button"
            >
              <X size={22} color="white" />
            </Pressable>
          </View>
        </View>

        <View
          className="flex-1"
          style={{ paddingTop: headerHeight, paddingBottom: insets.bottom }}
        >
          {post.videoKind === "youtube" && youtubeId ? (
            <WebView
              source={{ uri: youtubeEmbedUrl(youtubeId) }}
              style={{ flex: 1, backgroundColor: "#000" }}
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled
              domStorageEnabled
            />
          ) : (
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            >
              <NativeCommunityPlayer
                uri={post.playbackUrl}
                aspect={post.aspect}
              />
            </ScrollView>
          )}

          {post.description ? (
            <View className="border-t border-white/10 px-4 py-3">
              <Text className="text-sm text-white/80">{post.description}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

{
  /* Templates */
}

function CommunityCard({
  post,
  liked,
  onLike,
  onPlay,
}: {
  post: CommunityPost;
  liked: boolean;
  onLike: () => void;
  onPlay: () => void;
}) {
  const thumbHeight = post.aspect === "portrait" ? 280 : 180;

  return (
    <View
      className={`mb-4 overflow-hidden rounded-2xl border bg-white ${
        post.featured ? "border-2 border-[#FDB515]" : "border-[#2B3674]/10"
      }`}
    >
      <Pressable
        onPress={onPlay}
        className="relative overflow-hidden bg-[#2B3674]"
      >
        <Image
          source={{ uri: post.thumbnailUrl }}
          style={{ width: "100%", height: thumbHeight }}
          contentFit="cover"
        />

        <View className="absolute inset-0 items-center justify-center bg-black/15">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <View className="pl-1">
              <Play size={22} color="#2B3674" />
            </View>
          </View>
        </View>

        <View className="absolute left-2 top-2">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-black/55">
            <VolumeX size={13} color="white" />
          </View>
        </View>

        {post.featured && (
          <View className="absolute right-2 top-2">
            <View className="flex-row items-center rounded-full bg-[#FDB515] px-2 py-0.5 shadow">
              <Text className="text-[11px] font-bold text-[#2B3674]">
                ★ Featured
              </Text>
            </View>
          </View>
        )}

        <View className="absolute bottom-2 left-2 flex-row flex-wrap items-center gap-2">
          <View
            className="rounded-full px-2 py-0.5 shadow-sm"
            style={{ backgroundColor: post.categoryBg }}
          >
            <Text
              className="text-[11px] font-semibold"
              style={{ color: post.categoryText }}
            >
              {post.categoryLabel}
            </Text>
          </View>
          <View className="rounded bg-black/55 px-1.5 py-0.5">
            <Text className="text-[11px] font-medium text-white">
              {post.timeAgo}
            </Text>
          </View>
        </View>
      </Pressable>

      <View className="px-3 pb-3 pt-2.5">
        <Text
          className="text-[14px] font-semibold leading-tight text-[#2B3674]"
          numberOfLines={2}
        >
          {post.title}
        </Text>
        {post.description ? (
          <Text
            className="mt-1 text-[12.5px] leading-snug text-[#2B3674]/70"
            numberOfLines={3}
          >
            {post.description}
          </Text>
        ) : null}

        <View className="mt-2.5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Eye size={13} color="#2B3674" opacity={0.65} />
            <Text className="text-[12px] text-[#2B3674]/65">{post.views}</Text>
          </View>
          <Pressable
            onPress={onLike}
            className="flex-row items-center gap-1 rounded-full px-2 py-1"
          >
            <Heart
              size={14}
              color={liked ? "#FDB515" : "#2B3674"}
              fill={liked ? "#FDB515" : "transparent"}
              opacity={liked ? 1 : 0.65}
            />
            <Text className="text-[12px] text-[#2B3674]/65">
              {post.likes + (liked ? 1 : 0)}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

{
  /* Main Export Area */
}

export default function Community() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [sortBy, setSortBy] = useState<SortId>("recent");
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [playingPost, setPlayingPost] = useState<CommunityPost | null>(null);

  const filteredPosts = useMemo(() => {
    let posts =
      activeFilter === "all"
        ? COMMUNITY_POSTS
        : COMMUNITY_POSTS.filter((p) => p.filter === activeFilter);

    posts = [...posts];
    if (sortBy === "recent") {
      posts.sort((a, b) => a.sortRecent - b.sortRecent);
    } else if (sortBy === "views") {
      posts.sort((a, b) => b.views - a.views);
    } else {
      posts.sort((a, b) => b.likes - a.likes);
    }
    return posts;
  }, [activeFilter, sortBy]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <CommunityVideoModal
        post={playingPost}
        visible={playingPost !== null}
        onClose={() => setPlayingPost(null)}
      />

      <TabScreenHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 16,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 pr-24">
          <Text className="text-2xl font-bold text-[#2B3674]">Community</Text>
          <Text className="mt-1 text-[13px] text-[#2B3674]/60">
            Mentor intros, student projects, parent stories, and event recaps.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          contentContainerStyle={{ gap: 6, paddingVertical: 4 }}
        >
          <View className="flex-row items-center gap-1.5 rounded-full bg-[#2B3674]/5 p-1">
            {FILTERS.map(({ id, label }) => {
              const active = activeFilter === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => setActiveFilter(id)}
                  className={`rounded-full px-3.5 py-1.5 ${
                    active ? "bg-[#2B3674] shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`text-[12.5px] font-semibold ${
                      active ? "text-white" : "text-[#2B3674]/70"
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View className="mb-5 flex-row flex-wrap items-center justify-between gap-3">
          <Text className="text-[12px] text-[#2B3674]/65">Sort by:</Text>
          <View className="flex-row flex-wrap gap-2">
            {SORT_OPTIONS.map(({ id, label }) => {
              const active = sortBy === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => setSortBy(id)}
                  className={`rounded-md border px-2.5 py-1 ${
                    active
                      ? "border-[#FDB515] bg-[#FDB515]/10"
                      : "border-[#2B3674]/15 bg-white"
                  }`}
                >
                  <Text
                    className={`text-[12.5px] font-medium ${
                      active ? "text-[#2B3674]" : "text-[#2B3674]/70"
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {filteredPosts.length === 0 ? (
          <View className="items-center py-16">
            <Text className="text-base text-[#2B3674]/60">
              No posts in this category yet.
            </Text>
          </View>
        ) : (
          filteredPosts.map((post) => (
            <CommunityCard
              key={post.id}
              post={post}
              liked={!!likedIds[post.id]}
              onLike={() => toggleLike(post.id)}
              onPlay={() => setPlayingPost(post)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
