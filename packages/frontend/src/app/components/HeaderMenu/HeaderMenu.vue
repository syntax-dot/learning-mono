<template>
  <div :class="$style.menu">
    <div :class="$style.left">
      <EscButton :class="$style.esc" />
    </div>

    <div :class="$style.right">
      <LoginForm v-if="isLoginFormShown && !user" />
      <EditMode v-if="user" />
      <LogoutButton />
      <SignIn />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EscButton, EditMode, SignIn, LogoutButton } from "./buttons";
import { LoginForm } from "../LoginForm";
import { isLoginFormShown, user } from "../../store/user";
</script>

<style lang="scss" module>
.menu {
  display: grid;
  justify-content: stretch;
  grid-auto-flow: column;
  border-bottom: 1px solid rgba(37, 188, 80, 0.8);
  align-items: center;
  padding: 0px 40px;
  box-sizing: border-box;
  height: 100%;
}

.left,
.right {
  display: grid;
  grid-auto-flow: column;
}

.left {
  justify-content: start;
}

.right {
  justify-content: end;
}
</style>
