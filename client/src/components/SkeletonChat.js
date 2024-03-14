import { Skeleton } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import React from "react";

const SkeletonChat = () => {
  return (
    <>
      <Stack>
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
      </Stack>
    </>
  );
};

export default SkeletonChat;
