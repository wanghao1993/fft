import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { Chip } from "@heroui/chip";

import { Tag } from "@/types/tag";
import { getTags } from "@/service/module/tag";
import { useRouter } from "@/i18n/navigation";

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("SearchDialog");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const getTagList = () => {
    getTags().then((res) => {
      setTags(res);
    });
  };

  const onSearch = () => {
    if (!search) {
      return;
    }

    onOpenChange(false);

    router.push(`search?keywords=${search}`);
  };

  useEffect(() => {
    getTagList();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("title")}
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder={t("placeholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="mt-3 space-x-2 space-y-2">
                  🔥{" "}
                  {tags.map((item) => (
                    <Chip
                      key={item.id}
                      className="cursor-pointer"
                      color="primary"
                      size="sm"
                      onClick={() => {
                        onOpenChange(false);

                        router.push(`search?keywords=${item.name}`);
                      }}
                    >
                      {item.name}
                    </Chip>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSearch();
                  }}
                >
                  {t("title")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
