"use client";

import { useState, useEffect } from "react";

import AuthWrapper from "@/components/admin/AuthWrapper";
import NavTable from "@/components/admin/NavTable";
import NavForm from "@/components/admin/NavForm";
import { Nav, NavFormData } from "@/types/nav";
import {
  getNavs,
  createNav,
  updateNav,
  deleteNav,
  updateNavSort,
  toggleNavVisibility,
} from "@/service/module/nav";
import { useToast } from "@/components/ui/Toast";

export default function AdminNavPage() {
  const [navs, setNavs] = useState<Nav[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNav, setEditingNav] = useState<Nav | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // 获取所有菜单数据
  const fetchNavs = async () => {
    try {
      setIsLoading(true);
      const data = await getNavs();

      setNavs(data);
    } catch (error) {
      console.error("获取菜单数据失败:", error);
      toast.error({
        title: "获取菜单数据失败",
        description: "请重试",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavs();
  }, []);

  // 处理新增菜单
  const handleAdd = () => {
    setEditingNav(null);
    setIsFormOpen(true);
  };

  // 处理编辑菜单
  const handleEdit = (nav: Nav) => {
    setEditingNav(nav);
    setIsFormOpen(true);
  };

  // 处理删除菜单
  const handleDelete = async (id: string) => {
    try {
      await deleteNav(id);
      await fetchNavs();
      toast.success({
        title: "删除成功",
        description: "删除成功",
      });
    } catch (error) {
      console.error("删除菜单失败:", error);
      toast.error({
        title: "删除失败",
        description: "请重试",
      });
    }
  };

  // 处理切换显示状态
  const handleToggleVisibility = async (id: string) => {
    try {
      await toggleNavVisibility(id);
      await fetchNavs();
    } catch (error) {
      console.error("切换显示状态失败:", error);
      toast.error({
        title: "操作失败",
        description: "请重试",
      });
    }
  };

  // 处理上移
  const handleMoveUp = async (id: string) => {
    try {
      const currentNav = navs.find((nav) => nav.id === id);

      if (!currentNav) return;

      // 构建层级排序的菜单列表
      const buildHierarchicalNavs = (navs: Nav[]): Nav[] => {
        const result: Nav[] = [];
        const processed = new Set<string>();

        const addNavWithChildren = (nav: Nav) => {
          if (processed.has(nav.id)) return;

          result.push(nav);
          processed.add(nav.id);

          const children = navs
            .filter((n) => n.parentId === nav.id)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          children.forEach((child) => addNavWithChildren(child));
        };

        const topLevelNavs = navs
          .filter((nav) => !nav.parentId)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        topLevelNavs.forEach((nav) => addNavWithChildren(nav));

        return result;
      };

      const hierarchicalNavs = buildHierarchicalNavs(navs);
      const currentIndex = hierarchicalNavs.findIndex((nav) => nav.id === id);

      if (currentIndex > 0) {
        const prevNav = hierarchicalNavs[currentIndex - 1];

        // 确保只能在同一层级内移动
        if (currentNav.parentId === prevNav.parentId) {
          const newSortData = [
            { id: currentNav.id, sortOrder: prevNav.sortOrder },
            { id: prevNav.id, sortOrder: currentNav.sortOrder },
          ];

          await updateNavSort(newSortData);
          await fetchNavs();
        }
      }
    } catch (error) {
      console.error("上移失败:", error);
      toast.error({
        title: "操作失败",
        description: "请重试",
      });
    }
  };

  // 处理下移
  const handleMoveDown = async (id: string) => {
    try {
      const currentNav = navs.find((nav) => nav.id === id);

      if (!currentNav) return;

      // 构建层级排序的菜单列表
      const buildHierarchicalNavs = (navs: Nav[]): Nav[] => {
        const result: Nav[] = [];
        const processed = new Set<string>();

        const addNavWithChildren = (nav: Nav) => {
          if (processed.has(nav.id)) return;

          result.push(nav);
          processed.add(nav.id);

          const children = navs
            .filter((n) => n.parentId === nav.id)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          children.forEach((child) => addNavWithChildren(child));
        };

        const topLevelNavs = navs
          .filter((nav) => !nav.parentId)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        topLevelNavs.forEach((nav) => addNavWithChildren(nav));

        return result;
      };

      const hierarchicalNavs = buildHierarchicalNavs(navs);
      const currentIndex = hierarchicalNavs.findIndex((nav) => nav.id === id);

      if (currentIndex < hierarchicalNavs.length - 1) {
        const nextNav = hierarchicalNavs[currentIndex + 1];

        // 确保只能在同一层级内移动
        if (currentNav.parentId === nextNav.parentId) {
          const newSortData = [
            { id: currentNav.id, sortOrder: nextNav.sortOrder },
            { id: nextNav.id, sortOrder: currentNav.sortOrder },
          ];

          await updateNavSort(newSortData);
          await fetchNavs();
        }
      }
    } catch (error) {
      console.error("下移失败:", error);
      toast.error({
        title: "操作失败",
        description: "请重试",
      });
    }
  };

  // 处理表单提交
  const handleFormSubmit = async (formData: NavFormData) => {
    try {
      setIsSubmitting(true);

      if (editingNav) {
        // 更新菜单
        await updateNav(editingNav.id, formData);
        toast.success({
          title: "更新成功",
          description: "更新成功",
        });
      } else {
        // 创建菜单
        await createNav(formData);
        toast.success({
          title: "创建成功",
          description: "创建成功",
        });
      }

      setIsFormOpen(false);
      setEditingNav(null);
      await fetchNavs();
    } catch (error) {
      console.error("保存菜单失败:", error);
      toast.error({
        title: "保存失败",
        description: "请重试",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理表单关闭
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingNav(null);
  };

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <NavTable
          isLoading={isLoading}
          navs={navs}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onMoveDown={handleMoveDown}
          onMoveUp={handleMoveUp}
          onToggleVisibility={handleToggleVisibility}
        />

        <NavForm
          isLoading={isSubmitting}
          isOpen={isFormOpen}
          nav={editingNav}
          parentNavs={navs.filter((nav) => !nav.parentId)} // 只显示顶级菜单作为父级选项
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AuthWrapper>
  );
}
