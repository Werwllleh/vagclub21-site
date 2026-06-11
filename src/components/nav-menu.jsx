import {useEffect, useRef, useState} from 'react'
import {menuList} from '@/data/content'
import styled from "styled-components";
import {customTheme} from "@/styles/theme";
import {useUiStore} from "@/store/ui.store";
import Link from "next/link";

const CLOSE_DELAY = 140

const NavMenuContainer = styled.nav``
const NavMenuList = styled.ul`
    display: flex;
    align-items: ${({$mobile}) => $mobile ? "flex-start" : "center"};
    flex-direction: ${({$mobile}) => $mobile ? "column" : "row"};
    gap: ${({$mobile}) => $mobile ? "0.5rem" : "0"} clamp(1rem, 5vw, 2rem);
`
const NavMenuItem = styled.li`
    position: relative;
`
const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    font-size: clamp(1.6rem, 5vw, 2rem);
    color: ${customTheme.color.black};
    padding-block: .7rem;
    padding-inline: clamp(.7rem, 5vw, 1.2rem);
    white-space: nowrap;
    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            color: ${customTheme.color.primary};
        }
    }
`
const NavSubMenu = styled.ul`
    position: ${({$mobile}) => $mobile ? "relative" : "absolute"};
    top: 100%;
    left: 50%;
    width: 24rem;
    transform: translateX(-50%);
    background-color: ${({$mobile}) => $mobile ? "transparent" : "rgba(255, 255, 255, 0.9)"};
    backdrop-filter: ${({$mobile}) => $mobile ? "none" : "blur(1rem)"};
    z-index: 6;
    display: flex;
    flex-direction: column;
    gap: .5rem 0;
    padding-block: 1rem;
    padding-inline: 1.5rem;
    border-radius: ${customTheme.radius.r15};
    overflow: hidden;

    ${({$isOpen, $mobile}) => {
        const visible = $mobile || $isOpen

        return `
          opacity: ${visible ? 1 : 0};
          visibility: ${visible ? 'visible' : 'hidden'};
          pointer-events: ${visible ? 'auto' : 'none'};
        `
    }}

    transition: visibility ${customTheme.transition.small},
    opacity ${customTheme.transition.small};
`


const NavMenu = ({mobile, onLinkClick}) => {

  const setOverlayActive = useUiStore((state) => state.setOverlayActive)

  const closeTimerRef = useRef(null)

  const [openKey, setOpenKey] = useState(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const open = (key) => {
    clearCloseTimer()
    setOpenKey(key)
    !mobile && setOverlayActive(true)
  }

  const scheduleClose = (key) => {
    clearCloseTimer()

    closeTimerRef.current = setTimeout(() => {
      setOpenKey((current) => (current === key ? null : current))
    }, CLOSE_DELAY)
  }

  const closeNow = () => {
    clearCloseTimer()
    setOpenKey(null)
    setOverlayActive(false)
  }

  useEffect(() => {
    !mobile && setOverlayActive(Boolean(openKey))
  }, [openKey, setOverlayActive])

  useEffect(() => {
    return () => {
      clearCloseTimer()
    }
  }, [])

  return (
    <NavMenuContainer>
      <NavMenuList $mobile={mobile}>
        {menuList.map((item) => {
          const hasChildren = Boolean(item.children?.length)
          const isOpen = openKey === item.key

          return (
            <NavMenuItem
              key={item.key}
              onMouseEnter={() => hasChildren && open(item.key)}
              onMouseLeave={() => hasChildren && scheduleClose(item.key)}
              onFocus={() => hasChildren && open(item.key)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  hasChildren && scheduleClose(item.key)
                }
              }}
            >
              <NavLink
                as={item.path ? 'a' : 'span'}
                href={item.path || undefined}
                aria-haspopup={hasChildren ? 'menu' : undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
                onClick={() => item.path && onLinkClick()}
              >
                {item.label}
              </NavLink>

              {hasChildren && (
                <NavSubMenu
                  $isOpen={isOpen}
                  $mobile={mobile}
                  role="menu"
                  aria-hidden={!isOpen}
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={() => scheduleClose(item.key)}
                >
                  {item.children.map((subItem) => (
                    <NavMenuItem
                      key={subItem.key}
                      role="none"
                    >
                      <NavLink
                        href={subItem.path}
                        role="menuitem"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => {
                          closeNow()
                          onLinkClick?.()
                        }}
                      >
                        {subItem.label}
                      </NavLink>
                    </NavMenuItem>
                  ))}
                </NavSubMenu>
              )}
            </NavMenuItem>
          )
        })}
      </NavMenuList>
    </NavMenuContainer>
  )
}

export default NavMenu