<template>
  <div id="quotes" class="quotes">
    <header class="quote-header">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="showQuoteFormDialog = true">
            增加
          </el-button>
        </el-col>
      </el-row>

      <el-dialog
        title="编辑语录"
        :visible="showQuoteFormDialog"
        @close="visibleEditQuoteFormDialog"
      >
        <el-row v-show="editQuoteForm._id">
          <el-col :span="6">
            _Id
          </el-col>
          <el-col :span="18">
            {{ editQuoteForm._id }}
          </el-col>
        </el-row>
        <el-form :model="editQuoteForm">
          <el-form-item label="语录内容">
            <el-input
              type="textarea"
              placeholder="请输入语录内容"
              :autosize="{ minRows: 3 }"
              show-word-limit
              :maxlength="36"
              name="content"
              v-model="editQuoteForm.content"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visibleEditQuoteFormDialog">取 消</el-button>
          <el-button type="primary" @click="saveQuote">
            保 存
          </el-button>
        </div>
      </el-dialog>
    </header>
    <div class="quote-list-wrap">
      <div class="quote-list-header">
        <el-row>
          <el-col class="quote-list-header-col" :span="5">
            _id
          </el-col>
          <el-col class="quote-list-header-col" :span="12">
            内容
          </el-col>
          <el-col class="quote-list-header-col" :span="2">
            点赞👍
          </el-col>
          <el-col class="quote-list-header-col" :span="5">
            操作
          </el-col>
        </el-row>
      </div>
      <ul
        class="quote-list"
        v-infinite-scroll="load"
        :infinite-scroll-distance="100"
        :infinite-scroll-disable="quoteLoadFinished"
      >
        <template v-for="(quoteItem, quoteItemIndex) in quotes">
          <el-row tag="li" class="quote-item" :key="quoteItem['_id']">
            <el-col class="quote-item-col" :span="5">
              {{ quoteItem["_id"] }}
            </el-col>
            <el-col class="quote-item-col" :span="12">
              {{ quoteItem["content"] }}
            </el-col>
            <el-col class="quote-item-col" :span="2">
              {{ quoteItem["likes"] }}
            </el-col>
            <el-col class="quote-item-col" :span="5">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="editQuote(quoteItemIndex)"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="deleteQuote(quoteItemIndex)"
              ></el-button>
            </el-col>
          </el-row>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {},
  data() {
    return {
      quotes: [],
      quoteLoadLimit: 5,
      quoteLoadPage: 0,
      quoteLoadFinished: false,
      quoteLoading: false,
      showQuoteFormDialog: false,
      editQuoteForm: {
        _id: null,
        content: ""
      }
    };
  },
  methods: {
    getQuotes() {
      if (this.quoteLoading || this.quoteLoadFinished) {
        return;
      }
      this.quoteLoading = true;
      this.$http
        .get("quote", "getAll", {
          limit: this.quoteLoadLimit,
          page: this.quoteLoadPage
        })
        .then(quotes => {
          if (quotes.length < this.quoteLoadLimit) {
            this.quoteLoadFinished = true;
          }
          this.quoteLoadPage++;
          this.quotes.push(...quotes);
          this.quoteLoading = false;
        });
    },
    load() {
      if (this.quoteLoading || this.quoteLoadFinished) {
        return;
      }
      this.getQuotes();
    },
    visibleEditQuoteFormDialog() {
      this.showQuoteFormDialog = false;
      this.editQuoteForm.content = "";
    },
    saveQuote() {
      let { _id, content } = this.editQuoteForm;
      this.$http
        .post("quote", "saveQuote", {
          _id,
          content
        })
        .then(res => {
          if (_id == null) {
            this.$message({
              message: "增加成功",
              type: "success"
            });
            this.quotes.push({
              _id: res,
              likes: 0,
              content
            });
          } else {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.quotes[this.editQuoteForm.selectedIndex]["content"] = content;
          }
          this.visibleEditQuoteFormDialog();
        });
    },
    editQuote(index) {
      let selected = this.quotes[index];
      this.editQuoteForm._id = selected._id;
      this.editQuoteForm.content = selected.content;
      this.editQuoteForm.selectedIndex = index;
      this.showQuoteFormDialog = true;
    },
    deleteQuote(index) {
      let selected = this.quotes[index];
      this.$http
        .post("quote", "deleteQuote", {
          _id: selected._id
        })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.quotes.splice(index, 1);
        });
    }
  }
};
</script>

<style>
.quote-list-wrap {
  margin: 20px 0 50px;
  border: 1px solid #eee;
}
.quote-list-header {
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eee;
}
.quote-list-header-col {
  padding: 10px;
  word-break: break-all;
  border-right: 1px solid #eee;
}
.quote-item {
  border-bottom: 1px solid #eee;
}
.quote-item-col {
  padding: 10px;
  min-height: 60px;
  word-break: break-all;
  font-size: 15px;
  color: #666;
  border-right: 1px solid #eee;
}
</style>
