# Karabiner-Elements键盘配置

------

按下大写锁定`Caps_Lock`键，开始新的`层`

1. 方向键：`JKLI`
2. 系统功能：`MN → 音量加减`，`上下 → 音量加减`，`左右 → 亮度减加`
3. 特殊键：`分号; → 回车Enter`

```json
{
    "description": "enhance caps with other keys",
    "manipulators": [
        {
            "from": { "key_code": "caps_lock" },
            "to": [
                {
                    "set_variable": {
                        "name": "caps_arrow_mode",
                        "value": 1
                    }
                }
            ],
            "to_after_key_up": [
                {
                    "set_variable": {
                        "name": "caps_arrow_mode",
                        "value": 0
                    }
                }
            ],
            "to_if_alone": [
                {
                    "key_code": "spacebar",
                    "modifiers": ["left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "j",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "left_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "k",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "down_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "i",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "up_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "l",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "right_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "semicolon",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "return_or_enter" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "n",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "volume_decrement" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "m",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "volume_increment" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": { "key_code": "down_arrow" },
            "to": [{ "key_code": "volume_decrement" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": { "key_code": "up_arrow" },
            "to": [{ "key_code": "volume_increment" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": { "key_code": "left_arrow" },
            "to": [{ "key_code": "apple_top_case_display_brightness_decrement" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_arrow_mode",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": { "key_code": "right_arrow" },
            "to": [{ "key_code": "apple_top_case_display_brightness_increment" }],
            "type": "basic"
        }
    ],
    "title": "enhance caps with other keys"
}
```

