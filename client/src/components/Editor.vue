<template>
  <div class="editor box" v-if="user != null">
    <div class="field">
      <div>
        <p v-if="missingFields.has('title')" class="is-size-6 has-text-danger">Title is a required field!</p>
        <input
          v-model="title"
          class="titleInput input title is-1"
          type="text"
          placeholder="Title"
        />
      </div>
      <div class="field">
        <input
          v-model="subtitle"
          class="subtitleInput input card-header-title subtitle is-3"
          type="text"
          placeholder="Subtitle"
        />
      </div>
      <div class="menubar">
        <button
          is-white
          class="menubar__button button is-small button"
          @click="
            editor
              .chain()
              .toggleBold()
              .focus()
              .run()
          "
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <i class="fa fa-bold"></i>
        </button>

        <button
          is-white
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .toggleItalic()
              .focus()
              .run()
          "
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <i class="fa fa-italic"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .toggleStrike()
              .focus()
              .run()
          "
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <i class="fa fa-strikethrough"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .toggleUnderline()
              .run()
          "
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <i class="fa fa-underline"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleCode()
              .run()
          "
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <i class="fas fa-code"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .setParagraph()
              .run()
          "
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <i class="fa fa-paragraph"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <div class="is-title is-1">H1</div>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          "
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <i class="fa fa-list-ul"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          "
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <i class="fa fa-list-ol"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          "
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <i class="fa fa-quote-left"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()
          "
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <i class="far fa-file-code"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          "
        >
          -
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .undo()
              .run()
          "
        >
          <i class="fa fa-undo"></i>
        </button>

        <button
          class="menubar__button button is-small"
          @click="
            editor
              .chain()
              .focus()
              .redo()
              .run()
          "
        >
          <i class="fa fa-rotate-right"></i>
        </button>

        <button class="menubar__button button is-small">
          <i class="fas fa-image"></i>
        </button>
      </div>
      <p v-if="missingFields.has('content')" class="is-size-6 has-text-danger">Your post is too short!</p>
      <editor-content :class="missingFields.has('content') ? 'is-danger' : ''" class="editor__content" :editor="editor" rows="100" />
    </div>
    <button
      is-grouped
      is-grouped-right
      class="postButton button is-small is-primary"
      @click="submitPost()"
    >
      Submit
    </button>
  </div>
</template>

<script lang='ts'>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Editor",
  components: {
    EditorContent
  },
  props: {
    user: Object,
    content: String,
    displayTitle: String,
    displaySubtitle: String
  },
  data() {
    return {
      editor: new Editor({
        extensions: [StarterKit, Underline, Placeholder, Image],
        content: this.content,
        editorProps: {
          attributes: {
            class: "content"
          }
        },
        injectCSS: false
      }),
      title: this.displayTitle,
      subtitle: this.displaySubtitle,
      missingFields: new Set() as Set<String>
    };
  },
  methods: {
    submitPost() {
      const content = this.editor.getHTML()
      this.missingFields = new Set();
      if (this.title && content.length >= 100) {
        this.$emit("post", {
          title: this.title,
          subtitle: this.subtitle,
          content: content
        });
      }
      if (content.length < 100) this.missingFields.add("content");
      if (!this.title) this.missingFields.add("title");
    }
  },
  beforeUnmount() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.newPost {
  text-align: left;
}

// .menubar__button {
//   padding-left: 0.5em;
//   padding-right: 0.5em;
//   margin: 0.5em;
//   background: transparent;
//   border: none;
//   border-radius: 25px;
// }

.is-active {
  background: Gainsboro;
}

.input {
  margin-bottom: 1rem;
}

.editor{
  padding-bottom: 2.5rem;
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

:deep(.ProseMirror) {
  border: 1px solid transparent;
  padding: 0.5em;
  height: Auto;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  border-radius: 4px;
  border-color: #dbdbdb;
  min-height: 5em;
  color: #363636;
}

:deep(.ProseMirror-focused) {
  outline-width: 0px;
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.postButton {
  float: right;
  margin: 0.5em;
}

:deep(.content img) {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>